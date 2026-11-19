import { test, expect } from "@playwright/test";

test("Booking flight end to end scenarios", async ({ page }) => {
  await page.goto("https://www.qapractice.com/flight-booking-scenarios");

  // 1. Search Flights
  await page.getByTestId("flight-from").selectOption("Mumbai");
  await page.getByTestId("flight-to").selectOption("Delhi");

  const date = new Date();
  const departureDate = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 2);
  const returnDate = date.toISOString().split("T")[0];

  await page.getByTestId("flight-departure-date").fill(departureDate);
  await page.getByTestId("flight-return-date").fill(returnDate);
  await page.getByTestId("flight-passengers").fill("2");
  await page.getByTestId("flight-class").selectOption("First");

//   await page.waitForTimeout(3000)  // wait for some time to see execution

  await page.getByRole("button", { name: "Search Flights" }).click();


  // 2. Select non-stop file which has cheapest price for Journey
  const departureContainer = page.locator('[data-testid="flight-departure-list"]');
  await departureContainer.waitFor({ state: "visible" });
  const nonStopCards = departureContainer.locator('> div[data-testid^="flight-result-"]').filter({ hasText: "Non-stop" });

  const priceTexts = await nonStopCards.locator(".text-primary").allInnerTexts();
  console.log(priceTexts)
  const prices = priceTexts.map((text) => parseInt(text.replace(/[^0-9]/g, ""), 10));

  const lowestIndex = prices.indexOf(Math.min(...prices));
  await nonStopCards.nth(lowestIndex).locator('button:has-text("Select")').click();


  // 3. Select non-stop flight for cheapest price for return jouney
  const returnContainer = page.locator('[data-testid="flight-return-list"]');
  await returnContainer.waitFor({ state: "visible" });

  const nonStopReturnCards = returnContainer.locator('> div[data-testid^="flight-result-"]').filter({ hasText: "Non-stop" });
  const returnPriceTexts = await nonStopReturnCards.locator(".text-primary").allInnerTexts();
  const returnPrices = returnPriceTexts.map((text) => parseInt(text.replace(/[^0-9]/g, ""), 10),
  );

  const lowestReturnIndex = returnPrices.indexOf(Math.min(...returnPrices));
  await nonStopReturnCards.nth(lowestReturnIndex).locator('button:has-text("Select")').click();


//   await page.waitForTimeout(3000)  // wait for some time to see execution

  await page.getByTestId("flight-continue-to-passengers").click();

  // 4. Fill Passenger details

  await page.getByTestId("flight-passenger-name").fill("Adam smith")
  await page.getByTestId('flight-passenger-email').fill("Testing@gmail.com")
  await page.getByTestId('flight-passenger-phone').fill("9234567811")
//   await page.waitForTimeout(3000)  // wait for some time to see execution
  await page.getByTestId('flight-continue-to-payment').click({timeout:30000})

  // 5. Fill Card details to make payment

  await page.getByTestId("flight-card-number").fill("1234567891011213")
  await page.getByTestId("flight-expiry").fill("10/30")
  await page.getByTestId("flight-cvv").fill("123")
//   await page.waitForTimeout(3000)  // wait for some time to see execution
  await page.getByRole('button', {name:'Pay & Confirm Booking'}).click()

  // 6. Verify booking confirmation success message

  const succMsg = await page.getByTestId("flight-booking-success").textContent()
  expect(succMsg).toBe("Booking Confirmed!")

});
