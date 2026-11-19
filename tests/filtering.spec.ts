
import { test, expect } from '@playwright/test';

test('Calculate transaction totals by category', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank/transactions');

  // Login
  await page.locator('#username, input[name="username"]').fill('standard_user');
  await page.locator('#password, input[name="password"]').fill('bank_sauce');
  await page.locator('button[type="submit"]').click();
  await page.getByTestId('sidebar-link-transactions').click();

  const rows = page.locator('table tbody tr');
  await page.waitForSelector('table tbody tr')
  const totals: Record<string, number> = {};

  while (true) {
    for (let i = 0; i < await rows.count(); i++) {
      const cells = rows.nth(i).locator('td');

      const category = (await cells.nth(3).innerText()).trim();
      const text = (await cells.nth(4).innerText()).trim();

      const amount = parseFloat(text.replace(/[^0-9.-]/g, ''));

      totals[category] = (totals[category] || 0) + amount;
    }

    const next = page.locator('button:has-text("Next")');

    if (!(await next.isEnabled())) break;

    const firstRow = await rows.first().innerText();
    await next.click();

    await expect(rows.first()).not.toHaveText(firstRow);
  }

  console.log('--- Category Totals ---');

  for (const [category, total] of Object.entries(totals)) {
    console.log(`${category}: $${total.toFixed(2)}`);
  }
});