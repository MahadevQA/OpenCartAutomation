import {Page, Locator} from "@playwright/test"
import {ProductPage} from "../pages/ProductPage"

export class SearchResultsPage{

    private readonly page:Page
    private readonly searchPageHeader:Locator
    private readonly searchProduct:Locator
    private readonly productNotDisplyMsg:Locator
    private readonly listViewBtn:Locator
    private readonly gridViewBtn:Locator
    private readonly allProductCountForGridView:Locator
    private readonly allProductCountForListView:Locator

    constructor(page:Page){
        this.page = page
        this.searchPageHeader = page.locator("#content h1")
        this.searchProduct = page.locator("h4>a")
        this.productNotDisplyMsg = page.locator("#content p").last()
        this.listViewBtn = page.locator("#list-view")
        this.gridViewBtn = page.locator("#grid-view")
        this.allProductCountForGridView = page.locator(".product-layout.product-grid")
        this.allProductCountForListView = page.locator(".product-layout.product-list")

    }


    async isSearchResultsPageExists():Promise<boolean>
    {
        try{
            const headerText = await this.searchPageHeader.textContent()
            return headerText?.includes('Search -') ?? false
        }catch(error){
            return false
        }
    }

    async isProductExist(productName:string):Promise<boolean>
    {
        try{
            for(const product of await this.searchProduct.all())
            {
                const productText = (await product.textContent())?.trim()
                if(productText===productName){
                    return true
                }
            }
        }catch(error){
            console.log(`Error checking product existence: ${error}`)
        }
        return false
    }

    async selectProduct(productName:string):Promise<ProductPage | null>
    {
        try{
            for(const product of await this.searchProduct.all())
            {
                const productText = (await product.textContent())?.trim()
                if(productText===productName){
                    await product.click()
                    return new ProductPage(this.page)
                }
            }
            console.log(`Product not found: ${productName}`)
        }catch(error){
            console.log(`Error selecting product: ${error}`)
        }
        return null
    }

    async getProductsCount():Promise<number>
    {
        return await this.searchProduct.count()
    }

    async VerifyProductNotDisplayMsgAfterSearch():Promise<boolean>
    {
        try{
            return await this.productNotDisplyMsg.isVisible()
        }catch(error){
            console.log(`Message not displayed with error: ${error}`)
            return false
        }
    }

    async SelectGridView(){
        await this.gridViewBtn.click()
    }

    async SelectListView(){
        await this.listViewBtn.click()
    }

    async getCountOfProductForGridOrList(view:string="list")
    {
        if(view.toLowerCase()==="list"){
            return (await this.allProductCountForListView.all()).length
        }
        else if(view.toLowerCase()==="grid"){
            return (await this.allProductCountForGridView.all()).length
        }
    }

}