import {Page, Locator, expect} from "@playwright/test"
import { ShoppingCartPage } from "../pages/ShoppingCartPage"


export class ProductPage{

    private readonly page:Page
    private readonly txtQuantity:Locator
    private readonly btnAddToCart:Locator
    private readonly cnfMsg:Locator
    private readonly btnItmes:Locator
    private readonly linkViewCart:Locator
    private readonly wishListBtn:Locator
    private readonly compareProductBtn:Locator
    private readonly compareProductLink:Locator

    constructor(page:Page){
        this.page = page
        this.txtQuantity = page.locator("#input-quantity")
        this.btnAddToCart = page.locator("#button-cart")
        this.cnfMsg = page.locator(".alert.alert-success.alert-dismissible")
        this.btnItmes = page.locator("#cart")
        this.linkViewCart = page.locator("strong:has-text('View Cart')")
        this.wishListBtn = page.locator(".btn-group button[data-original-title='Add to Wish List']")
        this.compareProductBtn = page.locator("button[data-original-title='Compare this Product']").first()
        this.compareProductLink = page.locator("a:has-text('product comparison')")

    }

    async setQuantity(qty:string):Promise<void>
    {
        await this.txtQuantity.fill('')
        await this.txtQuantity.fill(qty)
    }

    async addToCart():Promise<void>
    {
        await this.btnAddToCart.click()
    }

    async isConfirmationMsgVisible():Promise<boolean>
    {
        try{
            if(this.cnfMsg!=null){
                return true
            }
            else{
                return false
            }
        }catch(error){
            console.log(`Confirmation message not found: ${error}`)
            return false
        }
    }

    async clickOnItemsBtn():Promise<void>
    {
        try{
            await this.btnItmes.click()
        }
        catch(error){
            console.log(`Error on clicking item button: ${error}`)
        }
    }

    async clickOnViewCart():Promise<ShoppingCartPage>
    {
        await this.linkViewCart.click()
        return new ShoppingCartPage(this.page)
    }

    async clickOnWishList()
    {
        await this.wishListBtn.click()
    }

    async clickOnCompareProductBtn(){
        await this.compareProductBtn.click()
    }

    async verifySuccMsgAndClickOnCompareLink(){
        const msg = await this.isConfirmationMsgVisible()
        if(msg){
            await this.compareProductLink.click()
        }
        else{
            console.log("Compare Product link not displayed...")
        }
    }
}