import { test, expect, Page } from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {CheckoutPage} from "../pages/CheckoutPage"
import {ShoppingCartPage} from "../pages/ShoppingCartPage"
import {LoginPage} from "../pages/LoginPage"
import {LogoutPage} from "../pages/LogoutPage"
import {MyAccountPage} from "../pages/MyAccountPage"
import {ProductPage} from "../pages/ProductPage"
import {RegistrationPage} from "../pages/RegistrationPage"
import {SearchResultsPage} from "../pages/SearchResultsPage"
import {TestConfig} from "../test.config"
import {RandomData} from "../utils/randomDataGen"
import { config } from "node:process"

test("execute end to end test flow",{tag:['@master', '@end-to-end']}, async({page})=>{
    const config = new TestConfig()
    // Launch app url
    await page.goto(config.appUrl)

    // Step 1: Register new account and capture new email
    let registeredEmail:string = await PerformRegistration(page)
    console.log("✅ Registration is completed!")

    // Step 2: Logout after successfull registration
    await PerformLogout(page)
    console.log("✅ Logout is completed!")

    // Step 3: Login with registered email
    await PerformLogin(page, registeredEmail)
    console.log("✅ Login is completed!")

    // Step 4: Search product and add to cart
    await addProductToCart(page)
    console.log("✅ Product added to cart!")

    // Step 5: Verify contents of the shopping cart
    await VerifyShoppingCart(page)
    console.log("✅ Shopping cart verification completed!")

    // Step 6: Perform Checkout
    await PerformCheckout(page)
    console.log("✅ Checkout is completed!")

})

async function PerformRegistration(page:Page):Promise<string> {

    const homePage = new HomePage(page)
    const registrationPage = new RegistrationPage(page)
    const config = new TestConfig()

    await homePage.clickMyAccount()
    await homePage.clickRegister()

    // fill registration form
    await registrationPage.setFirstName(RandomData.getFirstName())
    await registrationPage.setLasttName(RandomData.getLastName())
    let email:string = RandomData.getEmail()
    await registrationPage.setEmail(email)
    await registrationPage.setTelephone(RandomData.getPhoneNumber())
    await registrationPage.setPassword(config.password)
    await registrationPage.setConfirmPassword(config.password)
    await registrationPage.clickPrivacyPolicy()
    await registrationPage.clickContinueBtn()
    // Validate the confirmation message
    const confrimationMsg =  await registrationPage.getConfirmationMsg()
    expect(confrimationMsg).toContain("Your Account Has Been Created!")   
    return email
}

async function PerformLogout(page:Page) {
    const myAccountPage = new MyAccountPage(page)
    const logoutPage = new LogoutPage(page)
    await myAccountPage.clickLogout()
    expect(await logoutPage.isContinueButtonVisible()).toBeTruthy()
    const homePage = await logoutPage.clickContinue()
    expect(await homePage.isHomePageExists()).toBeTruthy()
}

async function PerformLogin(page:Page, email:string) {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    const config = new TestConfig()
    const myAccountPage = new MyAccountPage(page)

    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(email, config.password)

    expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy()

}

async function addProductToCart(page:Page) {
    const homePage = new HomePage(page)
    const config = new TestConfig()
    const productName:string = config.eteProductName
    const productQuantity:string = config.eteProductQuantity
    const searchResultsPage = new SearchResultsPage(page)

    await homePage.enterProductName(productName)
    await homePage.clickSearchBtn()

    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Validate product 
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy()

    // Select product and qty
    const productPage = await searchResultsPage.selectProduct(productName)
    await productPage?.setQuantity(productQuantity)
    await productPage?.addToCart()
    await page.waitForTimeout(3000)

    // Confirm product was added
    expect(await productPage?.isConfirmationMsgVisible()).toBeTruthy()
    
}

async function VerifyShoppingCart(page:Page) {

    const productPage = new ProductPage(page)
    const config = new TestConfig()

    // Navigate to shopping cart to product page
    await productPage.clickOnItemsBtn()
    const shoppingCartPage: ShoppingCartPage = await productPage.clickOnViewCart()
    console.log("Navigated to shopping cart!")

    // Validated that total price
    expect(await shoppingCartPage.getTotalPriceOfProduct()).toBe(config.eteTotalPrice)
}

async function PerformCheckout(page:Page){
    const shoppingCartPage = new ShoppingCartPage(page)
    const config = new TestConfig()
    const checkoutPage:CheckoutPage = await shoppingCartPage.clickOnCheckout()
    expect(await checkoutPage.isCheckoutPageExist()).toBeTruthy()
    const checkoutData = {
        firstname: RandomData.getFirstName(),
        lastname: RandomData.getLastName(),
        companyName: config.companyName,
        address1: config.address1,
        address2: config.address2,
        city: config.city,
        postcode: config.postcode,
        country: config.country,
        regionOrState: config.regionOrState,
        textMessage: config.textMessage
    };
    await checkoutPage.checkoutFlow(checkoutData)
}

