import { test, expect, request } from '@playwright/test';

test('Validate broken links on webpage', async ({ page }) => {

  await page.goto('https://demoqa.com/links');

  // 1️⃣ Get all anchor elements
  const links = await page.locator('a').all();

  console.log(`Total links found: ${links.length}`);

  const brokenLinks: string[] = [];

  // 2️⃣ Create API request context
  const apiContext = await request.newContext();

  for (const link of links) {

    const url = await link.getAttribute('href');

    if (!url || 
        url.startsWith('javascript') || 
        url.startsWith('mailto') || 
        url.startsWith('tel')) {
      continue;
    }

    try {
      const response = await apiContext.get(url, {
        timeout: 10000
      });

      const status = response.status();

      if (status >= 400) {
        console.log(`❌ Broken Link: ${url} - Status: ${status}`);
        brokenLinks.push(`${url} - ${status}`);
      }

    } catch (error) {
      console.log(`❌ Failed Request: ${url}`);
      brokenLinks.push(`${url} - Request Failed`);
    }
  }

  console.log("------------ Broken Links ------------");
  console.log(brokenLinks);

  expect(brokenLinks.length).toBe(0);
});

test("demo for wait for response", async({page})=>{

    await Promise.all([page.waitForResponse(resp=> resp.url().includes("/api/orders") && resp.status()===200) , page.getByRole('button', {name:'Submit'})])

  })