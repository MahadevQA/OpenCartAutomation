import {Page, Locator} from "@playwright/test"


export class HomePage{

    private readonly page: Page
    private readonly linkMyAccount:Locator
    private readonly linkRegister:Locator
    private readonly linkLogin:Locator
    private readonly txtSearchbox:Locator
    private readonly btnSearch:Locator
    private readonly btnWishList:Locator
    private readonly linkOrderHistory:Locator
    private readonly linkTrasanction:Locator
    private readonly linkDownload:Locator
    private readonly linkLogout:Locator


    constructor(page:Page){
        this.page = page
        this.linkMyAccount = page.locator("span:has-text('My Account')")
        this.linkRegister = page.locator("a:has-text('Register')")
        this.linkLogin = page.locator("a:has-text('Login')")
        this.txtSearchbox = page.locator("input[placeholder='Search']")
        this.btnSearch = page.locator("#search button[type='button']")
        this.btnWishList = page.locator("#wishlist-total")
        this.linkOrderHistory = page.locator(".dropdown-menu.dropdown-menu-right li a:has-text('Order History')")
        this.linkTrasanction = page.locator(".dropdown-menu.dropdown-menu-right li a:has-text('Transactions')")
        this.linkDownload = page.locator(".dropdown-menu.dropdown-menu-right li a:has-text('Downloads')")
        this.linkLogout = page.locator(".dropdown-menu.dropdown-menu-right li a:has-text('Logout')")
    }

    // Check if Home page exists
    async isHomePageExists(){
        let title:string = await this.page.title()
        if(title){
            return true
        }
        return false
    }

    // click "My Account" link
    async clickMyAccount(){
        try{
            await this.linkMyAccount.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'My Account': ${error}`)
            throw error
        }
    }

    // click "Register" link
    async clickRegister(){
        try{
            await this.linkRegister.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Register': ${error}`)
            throw error
        }
    }

    // click "Login" link
    async clickLogin(){
        try{
            await this.linkLogin.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Login': ${error}`)
            throw error
        }
    }

    // Enter product name in the search box 
    async enterProductName(productName:string){
        try{
            await this.txtSearchbox.fill(productName)
        }catch(error){
            console.log(`Exception occurred while entering product name: ${error}`)
            throw error
        }
    }

    // Click the search button
    async clickSearchBtn(){
        try{
            await this.btnSearch.click()
        }catch(error){
            console.log(`Exception occurred while clicking search button: ${error}`)
            throw error
        }
    }

    // click wish list button
    async clickWishListBtn(){
        try{
            await this.btnWishList.click()
        }catch(error){
            console.log(`Exception occurred while clicking wish list button: ${error}`)
            throw error
        }
    }

    // click "Order History" link
    async clickOrderHistory(){
        try{
            await this.linkOrderHistory.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Order History': ${error}`)
            throw error
        }
    }

    // click "Trasanction" link
    async clickTrasanction(){
        try{
            await this.linkTrasanction.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Trasanction': ${error}`)
            throw error
        }
    }

    // click "Downloads" link
    async clickDownloads(){
        try{
            await this.linkDownload.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Downloads': ${error}`)
            throw error
        }
    }

    // click "Logout" link
    async clickLogout(){
        try{
            await this.linkLogout.click()
        }catch(error){
            console.log(`Exception occurred while clicking 'Logout': ${error}`)
            throw error
        }
    }


}