import {test, expect} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { ProductComparePage } from "../pages/ProductComparePage";

 
let homePage:HomePage
let config:TestConfig
let searchResultsPage:SearchResultsPage
let productPage:ProductPage
let productComparePage:ProductComparePage

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    config = new TestConfig
    searchResultsPage = new SearchResultsPage(page)
    productPage = new ProductPage(page)
    productComparePage = new ProductComparePage(page)
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
    await page.close()
})

test("Compare product name in Compare Product page", {tag:['@master', '@regression']}, async()=>{

    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()
    await searchResultsPage.selectProduct(config.productName)
    await productPage.clickOnCompareProductBtn()
    await productPage.verifySuccMsgAndClickOnCompareLink()
    expect(await productComparePage.isProductComparePageExist()).toBeTruthy()
    await productComparePage.verifyProductDisplayedInComparePage(config.productName)
})

test("Remove product in Compare Product page", {tag:['@master', '@regression']},  async()=>{
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()
    await searchResultsPage.selectProduct(config.productName)
    await productPage.clickOnCompareProductBtn()
    await productPage.verifySuccMsgAndClickOnCompareLink()
    expect(await productComparePage.isProductComparePageExist()).toBeTruthy()
    await productComparePage.verifyProductDisplayedInComparePage(config.productName)
    await productComparePage.removeProduct()
    expect(await productComparePage.verifySuccessMsg()).toContain("Success: You have modified your product comparison!")
})

test("Add to Cart product from Compare Product page", {tag:['@master', '@regression']},  async()=>{
    await homePage.enterProductName(config.productName)
    await homePage.clickSearchBtn()
    await searchResultsPage.selectProduct(config.productName)
    await productPage.clickOnCompareProductBtn()
    await productPage.verifySuccMsgAndClickOnCompareLink()
    expect(await productComparePage.isProductComparePageExist()).toBeTruthy()
    await productComparePage.verifyProductDisplayedInComparePage(config.productName)
    await productComparePage.clickAddToCartBtn()
    expect((await productComparePage.verifySuccessMsg())?.trim()).toContain("Success: You have added MacBook to your shopping cart!")
})


