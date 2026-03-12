import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {LoginPage} from "../pages/LoginPage"
import {LogoutPage} from "../pages/LogoutPage"
import {MyAccountPage} from "../pages/MyAccountPage"
import {TestConfig} from "../test.config"


let config:TestConfig
let homePage:HomePage
let myAccountPage:MyAccountPage
let loginPage:LoginPage
let logoutPage:LogoutPage

test.beforeEach(async({page})=>{
    config = new TestConfig()
    homePage = new HomePage(page)
    myAccountPage = new MyAccountPage(page)
    loginPage = new LoginPage(page)
    //logoutPage = new LogoutPage(page)
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})


test("User Logout test", {tag: ['@master', '@regression']}, async()=>{

    // Navigate to login page
    await homePage.clickMyAccount()
    await homePage.clickLogin()

    // perform login with using valid credentials
    await loginPage.login(config.email, config.password)

    // verify successful login
    expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy()

    // click on logout button on My Account Page
    logoutPage = await myAccountPage.clickLogout()   // click and return logout page instance

    // verify continue button is visible before performing action 
    expect(await logoutPage.isContinueButtonVisible()).toBe(true)

    // click on continue button
    homePage = await logoutPage.clickContinue()  // click and return home page instance
    expect(await homePage.isHomePageExists()).toBeTruthy()
})