import {test} from "@playwright/test"
import { World } from "../utils/World";


let world = new World()

test("Create employee and search employee", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/");

    // Login
    await page.getByPlaceholder("Username")
        .fill("Admin");

    await page.getByPlaceholder("Password")
        .fill("admin123");

    await page.getByRole("button", {
        name: "Login"
    }).click();

    // const pageTitle = await page.title()
    // await page.title()
    world.set("title", await page.title())


    // Navigate to PIM
    await page.getByText("PIM").click();

    console.log("Page title is: "+world.get("title"))

})