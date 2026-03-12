import {test, expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {RegistrationPage} from "../pages/RegistrationPage"
import {RandomData} from "../utils/randomDataGen"
import {TestConfig} from "../test.config"


let homePage: HomePage
let registrationPage: RegistrationPage
let config: TestConfig

test.beforeEach(async({page})=>{
    config = new TestConfig()
    homePage = new HomePage(page)
    registrationPage = new RegistrationPage(page)
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})


test("User Registartion test",{tag:['@master','@sanity','@regression']}, async()=>{

    //Click on My Account Link
    await homePage.clickMyAccount()
    await homePage.clickRegister()

    //Fill Registration form
    await registrationPage.setFirstName(RandomData.getFirstName())
    await registrationPage.setLasttName(RandomData.getLastName())
    await registrationPage.setEmail(RandomData.getEmail())
    await registrationPage.setTelephone(RandomData.getPhoneNumber())
    const password = RandomData.getPassword()
    await registrationPage.setPassword(password)
    await registrationPage.setConfirmPassword(password)
    await registrationPage.clickPrivacyPolicy()
    await registrationPage.clickContinueBtn()

    // Validate the confirmation message
   const confrimationMsg =  await registrationPage.getConfirmationMsg()
   expect(confrimationMsg).toContain("Your Account Has Been Created!")  
})
