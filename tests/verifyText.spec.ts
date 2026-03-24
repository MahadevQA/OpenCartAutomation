import {test} from "@playwright/test"


test('test', async({page})=>{

    await page.goto("https://www.amazon.in/")

    const textwittTextcontent = await page.locator("#nav-link-accountList").textContent()
    console.log(textwittTextcontent)


    const textWithInnerText = await page.locator("#nav-link-accountList").innerText()
    console.log(textWithInnerText)



})