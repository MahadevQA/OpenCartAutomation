import {test, expect} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";
import { TestConfig } from "../test.config";
 
 
let homePage:HomePage
let config:TestConfig
let loginPage:LoginPage
let myAccountPage:MyAccountPage
let changePasswordPage:ChangePasswordPage

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    config = new TestConfig
    loginPage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
    changePasswordPage = new ChangePasswordPage(page)
    await page.goto(config.appUrl)
    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(config.email, config.password)
    expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy()
    await myAccountPage.clickChangeYourPasswordLink()
})

test.afterEach(async({page})=>{
    await page.close()
})


test("Verify Change password page is displayed", {tag:['@master', '@regression']}, async()=>{
    await changePasswordPage.isChangePasswordPageExist()
})

test("Verify user change new password with existing", {tag:['@master', '@regression']}, async()=>{
    await changePasswordPage.enterPassword(config.password)
    await changePasswordPage.enterConfirmPassword(config.password)
    await changePasswordPage.clickOnContinueBtn()
    expect(await myAccountPage.isSuccessMessageDisplayed()).toBeTruthy()
})


