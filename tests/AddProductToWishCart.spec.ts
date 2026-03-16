/**
 * 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
2. Click on the button having search icon
3. Click on the Product displayed in the Search results3
4. Click on 'Add to Wish List' option on a product that is displayed in the 'Related Products' section of displayed 'Product Display' page (Validate ER-1)
5. Click on the 'wish list!' link in the displayed success message (Validate ER-2)
 */

import {test, expect, Page} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { WishListPage } from "../pages/WishListPage";

let loginPage:LoginPage
let homePage:HomePage
let config:TestConfig
let searchResultsPage:SearchResultsPage
let productPage:ProductPage
let wishListPage: WishListPage

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    config = new TestConfig
    loginPage = new LoginPage(page)
    searchResultsPage = new SearchResultsPage(page)
    productPage = new ProductPage(page)
    wishListPage = new WishListPage(page)
    await page.goto(config.appUrl)
})

test.afterEach(async({page})=>{
    await page.close()
})


test("Add product to wish cart and verfiy success remove message", {tag:['@master', '@regression']}, async()=>{

    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(config.email, config.password)
    await homePage.enterProductName(config.productNameforWishList)
    await homePage.clickSearchBtn()
    await searchResultsPage.selectProduct(config.productNameforWishList)
    await productPage.clickOnWishList()
    expect(await productPage.isConfirmationMsgVisible()).toBeTruthy()
    await homePage.clickWishListBtn()
    expect(await wishListPage.isWishListPageExists()).toBeTruthy()
    expect(await wishListPage.isProductExist(config.productNameforWishList)).toBeTruthy()
    await wishListPage.removeProductAndVerifySuccessMsg(config.productNameforWishList)

})

