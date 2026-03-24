import {HomePage} from "../pages/HomePage"
import {TestConfig} from "../test.config"
import {test, expect, Locator, Page} from "@playwright/test"

let homePage: HomePage
let config:TestConfig

test("Verify Product is sorted based on names", async({page})=>{

    config = new TestConfig()
    homePage = new HomePage(page)
    await page.goto(config.appUrl)

    const desktopsLink = page.getByRole('link', {name: 'Desktops'})
    const showAllLink = page.getByRole('link', {name:"Show AllDesktops"})

    await desktopsLink.hover()
    await showAllLink.click()

    const defaultProduct = await page.locator('.product-thumb h4').allInnerTexts()
    console.log("Default product names: "+ defaultProduct)

    await SelectSortByDropdownBasedOnLable(page, 'Name (A - Z)')
    await page.waitForSelector(".product-thumb h4")
    await page.waitForTimeout(5000)
     
    const AtoZSortProduct = await page.locator('.product-thumb h4').allInnerTexts()
    console.log("Sorted product names: "+ AtoZSortProduct)
    expect(defaultProduct).toEqual(AtoZSortProduct);

    const isSorted = compareTwoArry(defaultProduct, AtoZSortProduct, true)
    console.log(isSorted)
    expect(isSorted).toBeTruthy()

})

async function SelectSortByDropdownBasedOnLable(page:Page, option:string) {
    
    await page.locator("#input-sort").selectOption({label: option})
}

function compareTwoArry(arr1:any[], arr2:any[], isEqual:boolean):boolean {
    
    if(arr1.length !== arr2.length){
        return false
    }
    const areEqual = arr1.every((value, index) => value === arr2[index]);
    return isEqual ? areEqual : ! areEqual
}

