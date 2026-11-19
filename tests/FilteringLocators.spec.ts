import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/filters_practice.html");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("filtering locators with using HasText", async ({ page }) => {
  // const productButton2 = page.getByRole('listitem').
  // filter({hasText: "Product 2"}).getByRole('button', {name:"Add to cart"});

  const productButton2 = page
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
    .getByRole("button", { name: "Add to cart" });

  await expect(productButton2).toBeVisible();

  await productButton2.click();
});

test("Filter using HasNotText", async ({ page }) => {
  // get all ele excecpt pot of stock , so used .card

  const inStockItems = page
    .locator(".card")
    .nth(1)
    .getByRole("listitem")
    .filter({ hasNotText: "Out of stock" });
  await expect(inStockItems).toHaveCount(3);
});

test("Filter using HasText", async ({ page }) => {
  // only find ele which has In stock text no need to used .card

  const inStockItems = page
    .getByRole("listitem")
    .filter({ hasText: "In stock" });
  await expect(inStockItems).toHaveCount(3);
});

test("Verify elements using data-testid", async ({ page }) => {

  const apple = page.getByTestId("apple");
  const banana = page.getByTestId("banana");
  const orange = page.getByTestId("orange");

  await Promise.all([
    expect(apple).toBeVisible(),
    expect(banana).toBeVisible(),
    expect(orange).toBeVisible()
  ])

  await Promise.all([
    expect(apple).toHaveText("🍏 apple"),
    expect(banana).toHaveText("🍌 banana"),
    expect(orange).toHaveText("🍊 orange"),
  ]);

});
