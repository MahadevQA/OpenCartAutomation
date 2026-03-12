import {test, expect} from "@playwright/test"
import {TestConfig} from "../test.config"
import {HomePage} from "../pages/HomePage"
import {SearchResultsPage} from "../pages/SearchResultsPage"
import {ProductPage} from "../pages/ProductPage"



let homePage:HomePage
let searchResultsPage:SearchResultsPage
let productPage:ProductPage
let config:TestConfig

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    searchResultsPage = new SearchResultsPage(page)
    productPage = new ProductPage(page)
    config = new TestConfig()
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})


test("Add product to cart test",{tag:['@master', '@regression']}, async()=>{

    // Enter product name in search box
    await homePage.enterProductName(config.productName)

    // Click on search button
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Verify that product exist in the results
    const isProductFound = await searchResultsPage.isProductExist(config.productName)
    expect(isProductFound).toBeTruthy()

    // Select product --> set Quantity -- Add to cart -- verify confirmation
    if(isProductFound){
        await searchResultsPage.selectProduct(config.productName)
        await productPage.setQuantity(config.productQuantity)
        await productPage.addToCart()

        // Assert success message is visible
        expect(await productPage.isConfirmationMsgVisible()).toBeTruthy()
    }
})
