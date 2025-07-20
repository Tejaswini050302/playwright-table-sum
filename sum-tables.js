const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 83 + i);
const urls = seeds.map(seed => `https://example.com/seed${seed}`); // Replace with actual base URL

async function scrapeAndSum() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let total = 0;

    for (const url of urls) {
        console.log(`Visiting: ${url}`);
        await page.goto(url);
        const numbers = await page.$$eval('table td', cells =>
            cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
        );
        const pageSum = numbers.reduce((acc, val) => acc + val, 0);
        console.log(`Sum for ${url}: ${pageSum}`);
        total += pageSum;
    }

    console.log(`TOTAL SUM: ${total}`);
    await browser.close();
}

scrapeAndSum();
