import {test, expect} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage";
import { MyAccountInformationPage } from "../pages/MyAccountInformationPage";
import { TestConfig } from "../test.config";
import { RandomData } from "../utils/randomDataGen"


let homePage:HomePage
let config:TestConfig
let loginPage:LoginPage
let myAccountPage:MyAccountPage
let myAccountInformationPage:MyAccountInformationPage
 

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    config = new TestConfig
    loginPage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
    myAccountInformationPage = new MyAccountInformationPage(page)
    await page.goto(config.appUrl)
    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(config.email, config.password)
    expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy()
    await myAccountPage.clickEditYourAccountInfo()
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
    await page.close()
})


test("Update user first name", {tag:['@master', '@regression']}, async()=>{
    expect(await myAccountInformationPage.isMyAccountInformationPageExist()).toBeTruthy()
    await myAccountInformationPage.updateFName(RandomData.getFirstName())
    await myAccountInformationPage.clickContinueBtn()
    expect(await myAccountInformationPage.isSuccessMessageDisplyed()).toBeTruthy()
})

test("Update user last name", {tag:['@master', '@regression']}, async()=>{
    expect(await myAccountInformationPage.isMyAccountInformationPageExist()).toBeTruthy()
    await myAccountInformationPage.updateLName(RandomData.getLastName())
    await myAccountInformationPage.clickContinueBtn()
    expect(await myAccountInformationPage.isSuccessMessageDisplyed()).toBeTruthy()
    
})

test("Update user mobile number", {tag:['@master', '@regression']}, async()=>{
    expect(await myAccountInformationPage.isMyAccountInformationPageExist()).toBeTruthy()
    await myAccountInformationPage.updatePhoneNum(RandomData.getPhoneNumber())
    await myAccountInformationPage.clickContinueBtn()
    expect(await myAccountInformationPage.isSuccessMessageDisplyed()).toBeTruthy()
})


