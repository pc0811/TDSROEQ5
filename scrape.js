const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 15 + i);
const baseUrl = 'https://example.com/seed='; // Replace with actual base URL

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);

    const tableValues = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.textContent) || 0)
    );

    const pageSum = tableValues.reduce((sum, val) => sum + val, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);
    totalSum += pageSum;
  }

  await browser.close();
  console.log(`Total sum: ${totalSum}`);
})();
