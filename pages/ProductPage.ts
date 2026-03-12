import {Page, Locator, expect} from "@playwright/test"
import { ShoppingCartPage } from "../pages/ShoppingCartPage"


export class ProductPage{

    private readonly page:Page
    private readonly txtQuantity:Locator
    private readonly btnAddToCart:Locator
    private readonly cnfMsg:Locator
    private readonly btnItmes:Locator
    private readonly linkViewCart:Locator

    constructor(page:Page){
        this.page = page
        this.txtQuantity = page.locator("#input-quantity")
        this.btnAddToCart = page.locator("#button-cart")
        this.cnfMsg = page.locator(".alert.alert-success.alert-dismissible")
        this.btnItmes = page.locator("#cart")
        this.linkViewCart = page.locator("strong:has-text('View Cart')")
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
}