import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { TestConfig } from "../test.config"
import { MyAccountPage } from "../pages/MyAccountPage"


let homePage:HomePage
let loginPage:LoginPage
let myAccountPage:MyAccountPage
let config:TestConfig

test("Handling multiple context", async({browser})=>{
    const context1 = await browser.newContext()

    let page1 = await context1.newPage()
     homePage = new HomePage(page1)
     loginPage = new LoginPage(page1)
     config = new TestConfig()
     myAccountPage = new MyAccountPage(page1)
        //Go to Login page
        await page1.goto(config.appUrl)
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

test("Handling multiple context2", async({browser})=>{
    const context2 = await browser.newContext()

    let page2 = await context2.newPage()
     homePage = new HomePage(page2)
     loginPage = new LoginPage(page2)
     config = new TestConfig()
     myAccountPage = new MyAccountPage(page2)
        //Go to Login page
        await page2.goto(config.appUrl)
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