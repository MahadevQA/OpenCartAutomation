import { test, expect } from "@playwright/test";

test("Mocking api request", async ({ page }) => {

    await page.route("*/**/api/v1/fruits", async route => {

        console.log("API intercepted:", route.request().url());

        const json = [
            { name: "Playwright" },
            { name: "Cypress" },
            { name: "Selenium" },
            { name: "Appium" },
        ];

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(json)
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking");

await expect(page.getByText("Playwright")).toBeVisible();
await expect(page.getByText("Cypress")).toBeVisible();
await expect(page.getByText("Selenium")).toBeVisible();
await expect(page.getByText("Appium")).toBeVisible();
});