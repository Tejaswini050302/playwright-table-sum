const { chromium } = require('playwright');  // Using async Playwright

const seeds = Array.from({ length: 10 }, (_, i) => 83 + i);
const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => parseFloat(td.textContent.trim())).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} Total: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`\n✅ Grand Total: ${grandTotal}`);
  await browser.close();
})();
