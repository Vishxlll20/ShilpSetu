import express from 'express';
import { openai, CHAT_MODEL } from '../openaiClient.js';

const router = express.Router();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const SYNTHESIS_PROMPT = `You are a pricing assistant for an Indian artisan marketplace (MoSJE). You are
given the artisan's actual production cost (material + labour) and real web search results about
market prices for similar products in India. Your job is to read the search results and extract a
realistic market price range grounded in what they actually say — never invent numbers not supported
by the search snippets.

Return JSON only, no prose, no markdown fences:
{
  "marketMin": number,     // lowest realistic market price (INR) found/implied in the search results
  "marketMax": number,     // highest realistic market price (INR) found/implied in the search results
  "suggested": number,     // final recommended price in INR, balanced against the real market range
  "reasoning": string      // 2-3 sentences: how you weighed base cost vs market range to land on suggested price
}

You will receive two key fields:
1. "concretePricesFoundInResults" — every exact ₹/Rs price extracted from search results, or "None found."
2. "searchResults" — the raw search snippets for context.

THE MOST IMPORTANT RULE — NUMERICAL ANCHORING:
When "concretePricesFoundInResults" contains real prices, you MUST use them as the primary signal.
Here is exactly how:
- Filter the list to prices that match THIS product's material and type (e.g. for a wooden vase,
  ignore crystal/glass/metal vases). If unsure which match, keep all.
- marketMin = lowest matching price. marketMax = highest matching price (or 2× marketMin if only
  one price found).
- suggested = a price WITHIN [marketMin, marketMax], biased toward the lower end for budget items
  and the midpoint for mid-range. Only suggest above marketMax if you have strong evidence of a
  premium segment (brand names, luxury listings).
- NEVER suggest a price more than 2× marketMax. That is always wrong — no artisan product should
  be priced 2× above every comparable listing in the market.
- NEVER ignore concrete prices in favor of baseCost. If baseCost = 230 and the market clearly
  sells this product for ₹250, suggest ₹250–₹350, NOT ₹1000. The artisan must work within
  market reality, not above it.

MATCHING RULES:
- Match prices to THIS product's type and material (read from the product name/category/material).
  If results give prices for different variants — e.g. a wooden vase at ₹250, a polyresin vase at
  ₹1,390, a crystal vase at ₹2,500 — anchor to the one matching THIS product (a wooden vase → ₹250),
  and set marketMin/marketMax/suggested around THAT, not around the premium variants.
- When the price list spans a wide spread, prefer the cluster matching the product's material/type
  and typical size. The highest prices are usually different/premium variants, NOT a reason to raise
  THIS product's price.

baseCost GUIDANCE (NOT a hard floor):
- baseCost is context, not a minimum. You MAY suggest below baseCost when search results clearly
  show the product sells for less. An unsellable price helps no one.
- If baseCost < marketMin, you may suggest marketMin or slightly above (10-20% margin) — the
  artisan has room.
- If baseCost > marketMax, suggest near marketMax and note in reasoning that the artisan may need
  to cut costs or reposition the product.
- NEVER inflate the suggested price beyond what search results support just to protect margin
  over baseCost. A ₹250 product priced at ₹1000 will not sell.

FALLBACK (only when concretePricesFoundInResults is "None found"):
- If search results are sparse or contain no concrete prices, say so in reasoning and fall back
  to a conservative range starting near baseCost. Do not fabricate specific figures.
- Do not cite fake statistics not present in the search results.`;

// Reduce a long, keyword-stuffed e-commerce title down to its core product description.
// Amazon-style titles join marketing phrases with "|"; the first segment is usually the real
// product name — but even that segment often contains marketing filler ("for Home Decor",
// "Buy Online", "Without Flowers") that biases search results toward premium listings.
function cleanProductName(name) {
  if (!name) return '';
  // Take only the first "|" segment (the actual product name, not marketing phrases)
  let core = String(name).split('|')[0].trim();
  // Strip common e-commerce filler phrases that don't describe the product itself
  core = core
    .replace(/\b(?:buy\s+online|for\s+(?:home\s+)?decor|for\s+(?:the\s+)?(?:home|office|bedroom|living\s+room|dining|kids|garden|patio|balcony)|without\s+\w+|not\s+included|set\s+of\s+\d+|pack\s+of\s+\d+|free\s+(?:delivery|shipping|shipping\s+above).*|best\s+(?:for|price|quality)|latest|trending|popular|combo\s+of\s+\d+)\b/gi, '')
    .replace(/[,.\s]+/g, ' ')  // collapse leftover whitespace/punctuation
    .trim();
  return core || String(name).split('|')[0].trim() || String(name).trim();
}

// Detect mass-market e-commerce titles (keyword-stuffed, "|"-separated, or full of buy/for-home
// marketing) vs artisan-craft product names, so we can target the right market segment.
function looksMassMarket(name) {
  const n = String(name || '').toLowerCase();
  if (n.includes('|')) return true;
  return /(buy online|for home decor|without |not included|set of|pack of|for (bedroom|office|living|wedding)|free delivery)/.test(n);
}

// Extract concrete Indian Rupee prices from raw text (₹250, Rs. 250, ₹ 2,499, INR 500, "price 250").
// Returns a de-duplicated, sorted list of numbers so the LLM is handed real figures instead of
// relying on it to notice prices buried in verbose page titles. Amounts that are clearly promo
// noise ("₹13 cashback", "₹1,500 discount", "₹200 off") are filtered out.
function extractPrices(text) {
  const re = /(?:₹|Rs\.?\s*|INR\s*|price[:\s]*)\s?(\d[\d,]*(?:\.\d+)?)/gi;
  const promoRe = /\b(cashback|cash ?back|discount|off|save|saving|emi|credit\s?card|deal|offer|was\s+₹|was\s+rs)/i;
  const found = new Set();
  let m;
  while ((m = re.exec(text)) !== null) {
    const n = Math.round(parseFloat(m[1].replace(/,/g, '')));
    const ctx = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 60);
    if (promoRe.test(ctx)) continue; // skip cashback/discount/EMI noise, not a product price
    if (Number.isFinite(n) && n > 0 && n < 100000) found.add(n);
  }
  return [...found].sort((a, b) => a - b);
}

async function tavilySearch(query, options = {}) {
  if (!TAVILY_API_KEY) return { results: [] };
  const body = {
    api_key: TAVILY_API_KEY,
    query,
    search_depth: 'basic',
    max_results: options.maxResults || 10,
    include_answer: true,
  };
  if (options.includeDomains?.length) body.include_domains = options.includeDomains;
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { results: [] };
  return res.json();
}

// POST /api/pricing/estimate
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

    // 1. Strip the verbose title down to its core description so the search isn't polluted by
    //    keyword-stuffed marketing phrases (the "|" segments after the actual product name).
    const coreName = cleanProductName(name) || category || '';
    const massMarket = looksMassMarket(name);

    // 2. Build a neutral, product-specific query. Avoid "handmade", "buy online", "for home decor"
    //    and other filler that biases results toward premium/artisan listings.
    const queryBase = coreName.replace(/\b(?:buy\s+online|handmade|handcrafted|artisan)\b/gi, '').replace(/\s+/g, ' ').trim();
    const query = massMarket
      ? `${queryBase || coreName} price India`
      : `${queryBase || coreName || category} price India`;

    // 3. Target known e-commerce marketplaces for mass-market goods so we get concrete listings
    //    with real prices instead of generic category pages. Artisan craft searches stay open.
    const includeDomains = massMarket ? ['amazon.in', 'flipkart.com', 'meesho.com'] : undefined;

    let searchData = await tavilySearch(query, { includeDomains });
    // Safety net: if the domain-targeted search finds nothing, retry without domain restriction
    // but still use the cleaned core name (not the full keyword-stuffed title).
    if (massMarket && !(searchData.results || []).length) {
      searchData = await tavilySearch(`${queryBase || coreName} price buy`, {});
    }
    const results = (searchData.results || []).slice(0, 10);

    const sources = results.map((r) => ({ title: r.title, url: r.url }));
    const searchContext = results.map((r) => `- ${r.title}: ${r.content?.slice(0, 600)}`).join('\n');

    // Distil every concrete price found across the results + Tavily's own answer, so the LLM
    // cannot claim "no market data" when real prices are sitting in the snippets it can't parse.
    const pricesFound = extractPrices([searchContext, searchData.answer || ''].join('\n'));

    const userContent = JSON.stringify({
      product: { name, category, material, quantity: quantity || 1 },
      baseCost,
      concretePricesFoundInResults: pricesFound.length ? pricesFound : 'None found.',
      searchResults: searchContext || 'No search results found.',
      tavilyAnswer: searchData.answer || '',
    });

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYNTHESIS_PROMPT },
        { role: 'user', content: userContent },
      ],
      response_format: { type: 'json_object' },
    });

    const llmRaw = completion.choices[0].message.content;
    const synthesis = JSON.parse(llmRaw);

    // 4. Debug mode: surface exactly what Tavily returned vs what the LLM decided, so we can tell
    //    whether the real price was in the search results and ignored, or never found by Tavily.
    if (isDebug) {
      console.log('\n[debug] query:', query);
      console.log('[debug] coreName:', coreName, '| massMarket:', massMarket);
      console.log('[debug] pricesFound:', pricesFound);
      console.log('[debug] Tavily answer:', searchData.answer || '(none)');
      console.log('[debug] Tavily results:');
      for (const r of results) {
        console.log(`  - ${r.title} | ${r.url}\n      ${(r.content || '').slice(0, 600)}`);
      }
      console.log('[debug] LLM raw output:', llmRaw);
    }

    const payload = {
      baseCost,
      marketMin: synthesis.marketMin,
      marketMax: synthesis.marketMax,
      suggested: synthesis.suggested,
      reasoning: synthesis.reasoning,
      sources,
    };
    if (isDebug) {
      payload.debug = {
        query,
        coreName,
        massMarket,
        pricesFound,
        tavilyAnswer: searchData.answer || '',
        tavilyResults: results.map((r) => ({ title: r.title, url: r.url, content: (r.content || '').slice(0, 600) })),
        llmRaw,
      };
    }
    res.json(payload);
  } catch (err) {
    console.error('[pricing/estimate] error:', err.message);
    res.status(500).json({ error: 'Pricing estimate failed. Please try again.' });
  }
});

export default router;
