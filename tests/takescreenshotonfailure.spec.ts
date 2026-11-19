import { test, expect } from "@playwright/test"
import fs from "fs"


const testdata = JSON.parse(fs.readFileSync("./testdata/testlogin.json","utf8"))


test.afterEach(async({page}, testInfo)=>{

    if(testInfo.status !== testInfo.expectedStatus){

        const screenshotname = (`${testInfo.title.replace(/\s+/g, "_")}_${testInfo.retry}.png`)
        await page.screenshot({path:`./screenshot/${screenshotname}`, fullPage:true })
    }

})

test("valid login", async({page})=>{
    await page.goto("")
    await page.locator("").fill(testdata.validUser.username)
    await page.locator("").fill(testdata.validUser.password)
    await page.locator("").click()
    expect(page.title).toContain("")
})

test("Invalid login", async({page})=>{
    await page.goto("")
    await page.locator("").fill(testdata.invalidUser.username)
    await page.locator("").fill(testdata.invalidUser.password)
    await page.locator("").click()
    expect(page.title).toContain("")
})