import {Page, Locator} from "@playwright/test"
import {CheckoutPage} from "../pages/CheckoutPage"


export class ShoppingCartPage{

    private readonly page:Page
    private readonly lblTotalPrice:Locator
    private readonly btnCheckout:Locator
    private readonly btnRemove:Locator


    constructor(page:Page){
        this.page = page
        this.lblTotalPrice = page.locator("//strong[text()='Total:']//following::td")
        this.btnCheckout = page.locator("a.btn.btn-primary")
        //this.btnRemove = page.locator("(//table[@class='table table-bordered']//a[text()='MacBook']//following::td)[2]//button[@data-original-title='Remove']")
    }

    async getTotalPriceOfProduct():Promise<null | string>
    {
        try{
            return await this.lblTotalPrice.textContent()
        }catch(error){
            console.log(`Unable to retrieve total price : ${error}`)
            return null
        }
    }

    async clickOnCheckout():Promise<CheckoutPage>
    {
        await this.btnCheckout.click()
        return new CheckoutPage(this.page)
    }

    async isPageLoaded():Promise<boolean>
    {
        try{
            return await this.btnCheckout.isVisible()
        }catch(error){
            console.log(`Page is not loaded with error: ${error}`)
            return false
        }
    }
}