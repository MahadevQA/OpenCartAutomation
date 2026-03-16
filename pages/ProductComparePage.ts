import {Page, Locator, expect} from "@playwright/test"


export class ProductComparePage{
    private readonly page:Page
    private readonly compareHeaderTitle:Locator
    private readonly productName:Locator
    private readonly removeBtn:Locator
    private readonly successMsg:Locator
    private readonly addToCartBtn:Locator

    constructor(page:Page){
        this.page = page
        this.compareHeaderTitle = page.locator("#content h1")
        this.productName = page.locator("tr a strong")
        this.removeBtn = page.locator(".btn.btn-danger.btn-block")
        this.successMsg = page.locator(".alert.alert-success.alert-dismissible")
        this.addToCartBtn = page.locator("input[value='Add to Cart']")
    }

    async verifyProductDisplayedInComparePage(productName: string) {
        expect(await this.productName.innerText()).toBe(productName)
    }

    async isProductComparePageExist(){
        try{
            const headerText = await this.compareHeaderTitle.textContent()
            return headerText?.includes('Product Comparison') ?? false
        }catch(error){
            return false
        }
    }

    async removeProduct(){
        await this.removeBtn.click()
    }

    async verifySuccessMsg():Promise<String | null>
    {
        return this.successMsg.textContent()
    }

    async clickAddToCartBtn(){
        await this.addToCartBtn.click()
    }
}