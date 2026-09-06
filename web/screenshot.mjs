import puppeteer from 'puppeteer';

const URL = 'http://localhost:5173';
const OUT = '/tmp/shilpscreenshots';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Loading page...');
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(1500);

  // Slowly scroll down the entire page to trigger all IntersectionObserver animations
  console.log('Scrolling to trigger animations...');
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${totalHeight}px`);

  for (let y = 0; y < totalHeight; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await delay(200);
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(500);

  // Full-page screenshot
  console.log('Taking full-page screenshot...');
  await page.screenshot({ path: `${OUT}/fullpage.png`, fullPage: true });

  // Section screenshots
  const sections = [
    { id: 'hero', name: 'hero' },
    { id: 'problem', name: 'problem' },
    { id: 'solution', name: 'solution' },
    { id: 'how-it-works', name: 'how-it-works' },
    { id: 'features', name: 'features' },
    { id: 'innovation', name: 'innovation' },
    { id: 'technology', name: 'technology' },
    { id: 'impact', name: 'impact' },
    { id: 'research', name: 'research' },
    { id: 'team', name: 'team' },
    { id: 'footer', name: 'footer' },
  ];

  for (const section of sections) {
    const el = await page.$(`#${section.id}`);
    if (el) {
      await el.scrollIntoView();
      await delay(300);
      await el.screenshot({ path: `${OUT}/${section.name}.png` });
      console.log(`Captured: ${section.name}`);
    } else {
      console.log(`Not found: ${section.id}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
