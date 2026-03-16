import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { TestConfig } from "../test.config"


let homePage:HomePage
let loginPage:LoginPage
let myAccountPage:MyAccountPage
let config:TestConfig

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
    config = new TestConfig()

    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})


test("User login with valid test data",{tag:['@master','@sanity','@regression']}, async()=>{

    //Go to Login page
    await homePage.clickMyAccount()
    await homePage.clickLogin()

    // Enter valid data and log in
    await loginPage.enterEmail(config.email)
    await loginPage.enterPassword(config.password)
    await loginPage.clickLoginBtn()

    // Verify user should be logged in 
    const isloggedIn = await myAccountPage.isMyAccountPageExist()
    expect(isloggedIn).toBeTruthy()
})

test("User login with Invalid test data",{tag:['@master','@sanity','@regression']}, async()=>{

    //Go to Login page
    await homePage.clickMyAccount()
    await homePage.clickLogin()

    // Enter valid data and log in
    await loginPage.enterEmail(config.email)
    await loginPage.enterPassword(config.invalidpassword)
    await loginPage.clickLoginBtn()

    // Verify error message should be display
    expect(await loginPage.getLoginErrorMessage()).toContain("Warning: No match for E-Mail Address and/or Password.")
})