import {test, expect} from "@playwright/test"

test("Booking flight", async({page})=>{
    await page.goto("https://www.qapractice.com/flight-booking-scenarios");
    // await page.locator("#flight-from").selectOption("London")
    await page.getByLabel("From").selectOption("London")
    await page.waitForTimeout(2000)
    await page.locator("#flight-to").selectOption("Paris")
    const date = new Date()
    const DepartureDate = date.toISOString().split("T")[0]
    date.setDate(date.getDate()+2)
    const ReturnDate = date.toISOString().split("T")[0]
    console.log(DepartureDate)
    console.log(ReturnDate)
    await page.getByTestId('flight-departure-date').fill(DepartureDate);
    await page.getByTestId('flight-return-date').fill(ReturnDate);
    await page.getByTestId('flight-passengers').fill("2")
    await page.getByTestId('flight-class').selectOption('First')
    // await page.getByTestId('flight-one-way').check();
    await page.waitForTimeout(2000)
    await page.getByTestId('flight-search').click();
    await page.waitForTimeout(2000)
    await page.getByTestId('flight-sort').selectOption('price-asc')
    await page.waitForTimeout(2000)
    await page.getByTestId('flight-select-GW100').click()
    await page.getByTestId('flight-select-SH237').click()
    await page.waitForTimeout(2000)
    await page.getByTestId("flight-continue-to-passengers").click()
    await page.waitForTimeout(2000)


})