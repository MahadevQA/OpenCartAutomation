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
    await page.close()
})


test("Search product test", {tag:['@master', '@regression']}, async()=>{
    // Enter product name and click search
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()

    // Verify Search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Verify if search product appear in results
    const isProductFound = searchResultsPage.isProductExist(config.productName)
    expect(isProductFound).toBeTruthy()
})