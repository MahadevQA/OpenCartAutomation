import { test, expect } from "@playwright/test";

test("Finding testcase count based on priority", async ({ page }) => {
  await page.goto("https://qaplayground.com/bank/login");
  await page.locator("#login-username").fill("standard_user");
  await page.locator("#login-password").fill("bank_sauce");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByTestId("sidebar-link-test-cases").click();

  const tableBody = page.getByTestId("test-cases-table").locator("tbody tr");
  await expect(tableBody.first()).toBeVisible();

  const highCheckbox = tableBody.filter({ hasText:"High" }).locator("span[data-slot='checkbox']")
  for(let check=0; check<await highCheckbox.count(); check++){
    await highCheckbox.nth(check).click()
  }
});
