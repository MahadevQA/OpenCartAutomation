import {test, expect} from "@playwright/test"
import {TestConfig} from "../test.config"
import {HomePage} from "../pages/HomePage"
import {SearchResultsPage} from "../pages/SearchResultsPage"


let homePage:HomePage
let searchResultsPage:SearchResultsPage
let config:TestConfig

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    searchResultsPage = new SearchResultsPage(page)
    config = new TestConfig()
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    //await page.waitForTimeout(5000)
    await page.close()
})


test("Verify when searching existing product should be display", {tag:['@master', '@regression']}, async()=>{
    // Enter product name and click search
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Verify if search product appear in results
    const isProductFound = searchResultsPage.isProductExist(config.productName)
    expect(isProductFound).toBeTruthy()
})

test("Verify when searching non existing product should not display", {tag:['@master', '@regression']}, async()=>{
    // Enter product name and click search
    await homePage.enterProductName(config.notExistingProductName)
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Verify search product not appear in results
    expect(await searchResultsPage.VerifyProductNotDisplayMsgAfterSearch()).toBeTruthy()
})

test("Verify Grid Functionality after search", {tag:['@master', '@sanity']}, async()=>{
    // Enter product name and click search
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Click on grid button
    await searchResultsPage.SelectGridView()

    // get product count 
    expect(await searchResultsPage.getCountOfProductForGridOrList("grid")).toBe(3)

})

test("Verify List Functionality after search", {tag:['@master', '@sanity']}, async()=>{
    // Enter product name and click search
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Click on grid button
    await searchResultsPage.SelectListView()

    // get product count 
    expect(await searchResultsPage.getCountOfProductForGridOrList("list")).toBe(3)
    
})