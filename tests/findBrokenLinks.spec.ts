import { test, request, expect } from '@playwright/test';

test('Validate Broken Links', async ({ page }) => {

  await page.goto("https://demoqa.com/links");

  const links = await page.locator("a").all();
  console.log("Total links on page is: " + links.length);

  const brokenLink: string[] = [];
  const validLink: string[] = [];

  const apiContext = await request.newContext();

  for (const link of links) {

    const href = await link.getAttribute('href');

    // ✅ Skip invalid links
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('javascript') || 
        href.startsWith('mailto') || 
        href.startsWith('tel')) {
      continue;
    }

    // ✅ Convert relative URL to absolute
    const url = new URL(href, page.url()).href;

    try {

      const response = await apiContext.get(url, { timeout: 10000 });
      const status = response.status();

      if (status >= 400) {
        console.log(`❌ Broken link: ${url} | Status: ${status}`);
        brokenLink.push(`${url} - ${status}`);
      } else {
        validLink.push(`${url} - ${status}`);
      }

    } catch (error) {
      console.log(`❌ Request Failed: ${url}`);
      brokenLink.push(`${url} - Request Failed`);
    }
  }

  console.log("----------- Broken Links -----------");
  console.log(brokenLink);

  console.log("----------- Valid Links -----------");
  console.log(validLink.length);

  expect(brokenLink.length).toBe(0);

});