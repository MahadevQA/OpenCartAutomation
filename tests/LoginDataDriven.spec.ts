import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { dataProvider } from "../utils/dataProvider"
import { TestConfig } from "../test.config"


// Load json data from logindata.json
const jsonfilepath = "testdata/logindata.json"
const jsonTestData = dataProvider.getTestDataFromJSON(jsonfilepath)

for(const data of jsonTestData){

    test(`Login test with json data: ${data.testName}`,{tag:['@master', '@datadriven']}, async({page})=>{

        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)
        const myAccountPage = new MyAccountPage(page)
        const config = new TestConfig()

        await page.goto(config.appUrl)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        await loginPage.login(data.email, data.password)

        if(data.expected.toLowerCase()==='success'){
            const isloggedIn = await myAccountPage.isMyAccountPageExist()
            expect(isloggedIn).toBeTruthy()
        }
        else{
            const loginErrorMsg = await loginPage.getLoginErrorMessage()
            console.log("error message",loginErrorMsg)
            expect(loginErrorMsg).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })

}

// Load json data from logindata.json
const csvfilepath = "testdata/logindata.csv"
const csvTestData = dataProvider.getTestDataFromCSV(csvfilepath)


for(const data of csvTestData){

    test(`Login test with CSV data: ${data.testName}`,{tag:['@master', '@datadriven']}, async({page})=>{

        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)
        const myAccountPage = new MyAccountPage(page)
        const config = new TestConfig()

        await page.goto(config.appUrl)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        await loginPage.login(data.email, data.password)

        if(data.expected.toLowerCase()==='success'){
            const isloggedIn = await myAccountPage.isMyAccountPageExist()
            expect(isloggedIn).toBeTruthy()
        }
        else{
            const loginErrorMsg = await loginPage.getLoginErrorMessage()
            expect(loginErrorMsg).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })

}