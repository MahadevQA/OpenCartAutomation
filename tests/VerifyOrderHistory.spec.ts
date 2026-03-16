import {test, expect} from "@playwright/test"
import {TestConfig} from "../test.config"
import {HomePage} from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { OrderHistoryPage } from "../pages/OrderHistoryPage"


let homePage:HomePage
let config:TestConfig
let loginPage:LoginPage
let orderHistoryPage:OrderHistoryPage

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    orderHistoryPage = new OrderHistoryPage(page)
    config = new TestConfig()
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})



test("Verify order history and records", {tag:['@master', '@regression']}, async()=>{
    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(config.email, config.password)
    await homePage.clickMyAccount()
    await homePage.clickOrderHistory()
    expect(await orderHistoryPage.isOrderHistoryPageExist()).toBeTruthy()
    const totalRecordsCount = await orderHistoryPage.getCountOfAllRowsOrRecord()
    expect(totalRecordsCount).toBeGreaterThanOrEqual(3)
})
