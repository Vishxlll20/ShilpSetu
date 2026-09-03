import express from 'express';
import { openai, CHAT_MODEL } from '../openaiClient.js';

const router = express.Router();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// ─── Marketplace registry ─────────────────────────────────────────────────────
// Each marketplace gets its own Tavily search scoped via include_domains.
// "handmade" marketplaces (IndiaMART, Etsy) are only included when the product
// looks artisan/craft — avoids noisy results for mass-market goods.
const MARKETPLACES = [
  { id: 'Amazon',   domains: ['amazon.in'] },
  { id: 'Flipkart', domains: ['flipkart.com'] },
  { id: 'Meesho',   domains: ['meesho.com'] },
];

const HANDMADE_MARKETPLACES = [
  { id: 'IndiaMART', domains: ['indiamart.com'] },
  { id: 'Etsy',      domains: ['etsy.com'] },
];

// ─── LLM system prompt (narrowed scope) ──────────────────────────────────────
// The LLM now receives pre-computed statistics and is ONLY asked to write
// natural-language reasoning and pick a final suggested price within the
// statistically-derived range. It does NOT do arithmetic or invent ranges.
const REASONING_PROMPT = `You are a pricing reasoning assistant for an Indian artisan marketplace.

You will receive:
- baseCost: the artisan's production cost (material + labour)
- marketMin / marketMax: statistically derived from real e-commerce price data
- medianPrice: the median of all extracted market prices
- marketplaceBreakdown: per-platform average prices and listing counts
- topListings: 2-3 exact price citations from search results

YOUR JOB — pick a final suggested price and write 2-3 sentences of reasoning.
You MUST:
1. Choose suggested WITHIN [marketMin, marketMax]. Never go outside this range.
2. Base your reasoning on the marketplace data provided — cite specific platforms.
3. If baseCost > marketMax, suggest near marketMax and note the cost pressure.
4. If baseCost < marketMin, suggest near marketMin (the market floor).
5. Prefer the lower-mid range for budget items, midpoint for mid-range.

Return JSON only, no prose, no markdown fences:
{
  "suggested": number,
  "reasoning": "2-3 sentences citing marketplace data"
}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Strip verbose e-commerce titles down to core product description.
// Amazon-style titles join marketing phrases with "|"; the first segment is
// usually the real product name but still contains filler.
function cleanProductName(name) {
  if (!name) return '';
  let core = String(name).split('|')[0].trim();
  core = core
    .replace(/\b(?:buy\s+online|for\s+(?:home\s+)?decor|for\s+(?:the\s+)?(?:home|office|bedroom|living\s+room|dining|kids|garden|patio|balcony)|without\s+\w+|not\s+included|set\s+of\s+\d+|pack\s+of\s+\d+|free\s+(?:delivery|shipping|shipping\s+above).*|best\s+(?:for|price|quality)|latest|trending|popular|combo\s+of\s+\d+)\b/gi, '')
    .replace(/[,.\s]+/g, ' ')
    .trim();
  return core || String(name).split('|')[0].trim() || String(name).trim();
}

// Detect mass-market e-commerce titles (keyword-stuffed, "|"-separated).
function looksMassMarket(name) {
  const n = String(name || '').toLowerCase();
  if (n.includes('|')) return true;
  return /(buy online|for home decor|without |not included|set of|pack of|for (bedroom|office|living|wedding)|free delivery)/.test(n);
}

// Detect artisan / handmade / craft products so we can include IndiaMART/Etsy.
function looksHandmade(name, category, material) {
  const text = [name, category, material].filter(Boolean).join(' ').toLowerCase();
  return /\b(handmade|handcrafted|artisan|craft|wooden|clay|terracotta|painted|embroidered|weav|pottery|ceramic|brass|copper|jute|macrame|crochet|knit)\b/.test(text);
}

// Extract the product type (the core noun phrase: "flower vase", "storage container",
// "wall hanging") and material/attribute keywords from a product name.
// The product type is the most important signal for relevance — a result about a
// "laptop stand" should never match a "flower vase" query, even if both contain "wooden".
function extractKeywords(name) {
  if (!name) return [];
  const stopwords = new Set([
    'for', 'the', 'and', 'with', 'of', 'in', 'on', 'at', 'to', 'a', 'an',
    'is', 'it', 'by', 'or', 'be', 'not', 'no', 'new', 'set', 'pack',
    'piece', 'pcs', 'size', 'big', 'small', 'latest', 'best', 'price',
    'online', 'buy', 'home', 'decor', 'decorative', 'office', 'bedroom',
    'living', 'room', 'kitchen', 'dining', 'kids', 'garden', 'patio',
    'without', 'free', 'delivery', 'shipping', 'combo', 'trending',
    'popular', 'quality', 'brand', 'original', 'genuine', 'premium',
  ]);
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopwords.has(w))
    .slice(0, 6);
}

// Common product type words — if any of these appear in the product name, they
// define the product category and must appear in search results too.
const PRODUCT_TYPE_WORDS = new Set([
  'vase', 'pot', 'lamp', 'stand', 'holder', 'basket', 'box', 'bag',
  'shirt', 'dress', 'sari', 'saree', 'kurta', 'towel', 'rug', 'mat',
  'painting', 'frame', 'candle', 'mirror', 'clock', 'bell', 'idol',
  'figurine', 'toy', 'doll', 'pen', 'bottle', 'jar', 'plate', 'bowl',
  'cup', 'mug', 'spoon', 'fork', 'knife', 'tool', 'brush', 'comb',
  'necklace', 'bracelet', 'earring', 'ring', 'bangle', 'pendant',
]);

// Check if a search result is relevant to the product.
// Strategy: require that the product's core type word (e.g. "vase") appears in
// the result, AND at least one other keyword matches. This prevents "laptop stand"
// from matching a "flower vase" query just because both contain "wooden".
function isRelevantResult(result, productKeywords) {
  if (!productKeywords.length) return true;
  const text = `${result.title || ''} ${result.content || ''}`.toLowerCase();

  // Find the product type word (vase, pot, lamp, etc.)
  const typeWord = productKeywords.find((kw) => PRODUCT_TYPE_WORDS.has(kw));

  if (typeWord) {
    // Must contain the product type word AND at least one other keyword
    if (!text.includes(typeWord)) return false;
    const otherMatches = productKeywords.filter((kw) => kw !== typeWord && text.includes(kw));
    return otherMatches.length >= 1;
  }

  // No recognized type word — fall back to requiring 2+ keyword matches
  const strongKeywords = productKeywords.filter((k) => k.length >= 4);
  if (strongKeywords.length < 2) return true;
  const matchCount = strongKeywords.filter((kw) => text.includes(kw)).length;
  return matchCount >= 2;
}

// ─── Price extraction ─────────────────────────────────────────────────────────
// Extract concrete Indian Rupee prices from raw text.
// Returns de-duplicated, sorted numbers. Promo noise (cashback, discount, EMI)
// is filtered out to avoid contaminating the dataset.
function extractPrices(text) {
  const re = /(?:₹|Rs\.?\s*|INR\s*|price[:\s]*)\s?(\d[\d,]*(?:\.\d+)?)/gi;
  const promoRe = /\b(cashback|cash ?back|discount|off|save|saving|emi|credit\s?card|deal|offer|was\s+₹|was\s+rs)\b/i;
  const found = new Set();
  let m;
  while ((m = re.exec(text)) !== null) {
    const n = Math.round(parseFloat(m[1].replace(/,/g, '')));
    const ctx = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 60);
    if (promoRe.test(ctx)) continue;
    if (Number.isFinite(n) && n > 0 && n < 100000) found.add(n);
  }
  return [...found].sort((a, b) => a - b);
}

// Extract prices with their source context (title + url) for citation.
function extractPricesWithContext(results, marketplaceId) {
  const items = [];
  for (const r of results) {
    const combined = `${r.title || ''} ${r.content || ''}`;
    const prices = extractPrices(combined);
    for (const price of prices) {
      items.push({
        marketplace: marketplaceId,
        price,
        title: r.title || '',
        url: r.url || '',
      });
    }
  }
  return items;
}

// ─── Statistical aggregation (deterministic, no AI) ───────────────────────────

function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function mean(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

// Aggregate extracted prices: filter outliers (>3x median), compute range,
// median, and per-marketplace averages.
function aggregatePrices(allItems) {
  if (!allItems.length) {
    return { median: 0, min: 0, max: 0, filtered: [], perMarketplace: {} };
  }

  const med = median(allItems.map((i) => i.price));

  // Outlier filter: discard prices >3x median (likely wrong product matches)
  const filtered = med > 0
    ? allItems.filter((i) => i.price <= med * 3 && i.price >= med / 3)
    : allItems;

  const prices = filtered.map((i) => i.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  // Per-marketplace breakdown
  const perMarketplace = {};
  for (const item of filtered) {
    if (!perMarketplace[item.marketplace]) {
      perMarketplace[item.marketplace] = { prices: [], count: 0 };
    }
    perMarketplace[item.marketplace].prices.push(item.price);
    perMarketplace[item.marketplace].count++;
  }

  // Compute averages
  const breakdown = {};
  for (const [mp, data] of Object.entries(perMarketplace)) {
    breakdown[mp] = { avgPrice: mean(data.prices), listingsFound: data.count };
  }

  return { median: med, min, max, filtered, perMarketplace: breakdown };
}

// ─── Tavily search ────────────────────────────────────────────────────────────

async function tavilySearch(query, options = {}) {
  if (!TAVILY_API_KEY) return { results: [] };
  const body = {
    api_key: TAVILY_API_KEY,
    query,
    search_depth: options.searchDepth || 'basic',
    max_results: options.maxResults || 8,
    include_answer: true,
  };
  if (options.includeDomains?.length) body.include_domains = options.includeDomains;

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`[pricing] Tavily search failed (${res.status}) for query: ${query}`);
      return { results: [] };
    }
    return res.json();
  } catch (err) {
    console.error(`[pricing] Tavily search error for query "${query}":`, err.message);
    return { results: [] };
  }
}

// ─── Main endpoint ────────────────────────────────────────────────────────────

router.post('/estimate', async (req, res) => {
  try {
    const { name, category, material, materialCost, labourHours, wageRate, quantity, debug } = req.body || {};
    const isDebug = debug === true || debug === 'true' || req.query.debug === '1';

    if (!name && !category) {
      return res.status(400).json({ error: 'No product details provided' });
    }

    const matCost = Number(materialCost) || 0;
    const hours = Number(labourHours) || 0;
    const wage = Number(wageRate) || 0;
    const baseCost = Math.round(matCost + hours * wage);

    // ── Stage 1: Build search query ───────────────────────────────────────
    const coreName = cleanProductName(name) || category || '';
    const massMarket = looksMassMarket(name);
    const handmade = looksHandmade(name, category, material);

    // Build a tight, product-specific query — just the core product + "price India".
    // Long keyword-stuffed titles confuse Tavily's relevance when scoped to a single domain.
    const queryBase = coreName
      .replace(/\b(?:buy\s+online|handmade|handcrafted|artisan|for\s+(?:home\s+)?decor)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    const query = `${queryBase || coreName || category} price India`;

    // Extract keywords for relevance filtering downstream
    const productKeywords = extractKeywords(coreName || name || category);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('[pricing] Stage 1 — Query Preparation');
    console.log(`  coreName: "${coreName}"`);
    console.log(`  massMarket: ${massMarket} | handmade: ${handmade}`);
    console.log(`  productKeywords: [${productKeywords.join(', ')}]`);
    console.log(`  baseCost: ₹${baseCost}`);

    // ── Stage 2: Multi-marketplace search ─────────────────────────────────
    console.log('\n[pricing] Stage 2 — Multi-Marketplace Search');

    const marketplaces = [
      ...MARKETPLACES,
      ...(handmade ? HANDMADE_MARKETPLACES : []),
    ];

    // Run all searches in parallel for speed.
    // Each marketplace gets tailored queries — Tavily's snippet quality varies
    // wildly by platform, so we try the best query first, then retry with a
    // fallback if the first attempt returns mostly boilerplate (no prices).
    const MARKETPLACE_QUERIES = {
      Amazon:   [query],
      Flipkart: [`${queryBase || coreName} price list`, `${queryBase || coreName} buy price`],
      Meesho:   [`${queryBase || coreName} buy price`, `${queryBase || coreName} price list`],
      IndiaMART: [query],
      Etsy:     [query],
    };

    const searchPromises = marketplaces.map(async (mp) => {
      const queries = MARKETPLACE_QUERIES[mp.id] || [query];

      let bestResults = [];
      let bestAnswer = '';

      for (const q of queries) {
        // Flipkart's product pages are JS-rendered — 'basic' depth only gets
        // boilerplate footer text. 'advanced' crawls deeper and extracts prices.
        const depth = mp.id === 'Flipkart' ? 'advanced' : 'basic';
        console.log(`  → ${mp.id}: query="${q}" domains=[${mp.domains.join(', ')}] depth=${depth}`);
        const searchData = await tavilySearch(q, { includeDomains: mp.domains, searchDepth: depth });
        const rawResults = (searchData.results || []).slice(0, 10);

        // Check if this result set has any extractable prices — if so, use it.
        // If not, try the next query variant.
        const hasPrices = rawResults.some((r) => {
          const combined = `${r.title || ''} ${r.content || ''}`;
          return extractPrices(combined).length > 0;
        });

        if (hasPrices || bestResults.length === 0) {
          bestResults = rawResults;
          bestAnswer = searchData.answer || '';
        }

        if (hasPrices) break; // good enough, stop retrying
      }

      // Apply relevance filter — discard results whose title/content share no
      // meaningful keywords with the product name. This prevents "laptop stand"
      // or "night dress" results from contaminating the price dataset.
      const relevantResults = bestResults.filter((r) => isRelevantResult(r, productKeywords));
      const dropped = bestResults.length - relevantResults.length;
      console.log(`  ← ${mp.id}: ${bestResults.length} raw → ${relevantResults.length} relevant${dropped > 0 ? ` (${dropped} dropped)` : ''}`);

      return { marketplace: mp.id, results: relevantResults.slice(0, 8), answer: bestAnswer };
    });

    const searchResults = await Promise.all(searchPromises);

    // ── Stage 3: Structured price extraction ──────────────────────────────
    console.log('\n[pricing] Stage 3 — Structured Price Extraction');

    let allPriceItems = [];
    const allSources = [];

    for (const { marketplace, results } of searchResults) {
      const items = extractPricesWithContext(results, marketplace);
      allPriceItems.push(...items);

      // Collect sources with extracted prices
      for (const r of results) {
        const combined = `${r.title || ''} ${r.content || ''}`;
        const prices = extractPrices(combined);
        allSources.push({
          title: r.title || '',
          url: r.url || '',
          marketplace,
          extractedPrice: prices.length ? prices[0] : null,
        });
      }

      console.log(`  ${marketplace}: extracted ${items.length} price points`);
    }

    // ── Stage 4: Statistical aggregation ──────────────────────────────────
    console.log('\n[pricing] Stage 4 — Statistical Aggregation');

    const stats = aggregatePrices(allPriceItems);

    console.log(`  Median: ₹${stats.median}`);
    console.log(`  Range: ₹${stats.min} – ₹${stats.max}`);
    console.log(`  Total price points (after outlier filter): ${stats.filtered.length}`);
    console.log('  Per-marketplace breakdown:');
    for (const [mp, data] of Object.entries(stats.perMarketplace)) {
      console.log(`    ${mp}: avg ₹${data.avgPrice} (${data.listingsFound} listings)`);
    }

    // Build the marketplaceBreakdown array for the response.
    // Always include ALL searched marketplaces — even those with 0 results — so
    // the frontend can show "Flipkart: 0 listings" instead of silently omitting it.
    const marketplaceBreakdown = marketplaces.map((mp) => {
      const data = stats.perMarketplace[mp.id];
      return {
        marketplace: mp.id,
        avgPrice: data ? data.avgPrice : 0,
        listingsFound: data ? data.listingsFound : 0,
      };
    });

    // ── Stage 5: LLM reasoning (narrow scope) ────────────────────────────
    console.log('\n[pricing] Stage 5 — LLM Reasoning');

    let suggested = stats.median || baseCost;
    let reasoning = '';

    if (stats.filtered.length > 0) {
      // Pick top 2-3 citations for the LLM
      const topListings = stats.filtered.slice(0, 3).map((i) => ({
        marketplace: i.marketplace,
        price: i.price,
        title: i.title,
      }));

      const userContent = JSON.stringify({
        baseCost,
        marketMin: stats.min,
        marketMax: stats.max,
        medianPrice: stats.median,
        marketplaceBreakdown,
        topListings,
      });

      console.log(`  Sending to LLM: marketMin=₹${stats.min}, marketMax=₹${stats.max}, median=₹${stats.median}`);

      const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
        temperature: 0.2,
        messages: [
          { role: 'system', content: REASONING_PROMPT },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      });

      const llmRaw = completion.choices[0].message.content;
      const parsed = JSON.parse(llmRaw);

      // Clamp LLM's suggestion to the statistical range
      suggested = Math.max(stats.min, Math.min(stats.max, Number(parsed.suggested) || stats.median));
      reasoning = parsed.reasoning || '';

      if (isDebug) {
        console.log('  LLM raw output:', llmRaw);
        console.log(`  LLM suggested: ₹${parsed.suggested} → clamped to ₹${suggested}`);
      }
    } else {
      // Fallback: no market data found — anchor to baseCost with a small margin
      suggested = Math.round(baseCost * 1.2);
      reasoning = `No market price data could be extracted from search results. Suggested price is based on a 20% margin over production cost (₹${baseCost}).`;
      console.log('  ⚠ No price data extracted — falling back to baseCost + 20% margin');
    }

    console.log(`\n[pricing] Final: suggested ₹${suggested}, range ₹${stats.min}–₹${stats.max}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // ── Build response ────────────────────────────────────────────────────
    const payload = {
      baseCost,
      marketMin: stats.min,
      marketMax: stats.max,
      suggested,
      reasoning,
      marketplaceBreakdown,
      sources: allSources.slice(0, 20),
    };

    if (isDebug) {
      payload.debug = {
        query,
        coreName,
        massMarket,
        handmade,
        pricesFound: allPriceItems.map((i) => i.price),
        stats: {
          median: stats.median,
          min: stats.min,
          max: stats.max,
          filteredCount: stats.filtered.length,
          totalCount: allPriceItems.length,
        },
      };
    }

    res.json(payload);
  } catch (err) {
    console.error('[pricing/estimate] error:', err.message);
    res.status(500).json({ error: 'Pricing estimate failed. Please try again.' });
  }
});

export default router;
