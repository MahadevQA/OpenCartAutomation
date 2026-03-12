import {Page, Locator} from "@playwright/test"
import {ProductPage} from "../pages/ProductPage"

export class SearchResultsPage{

    private readonly page:Page
    private readonly searchPageHeader:Locator
    private readonly searchProduct:Locator

    constructor(page:Page){
        this.page = page
        this.searchPageHeader = page.locator("#content h1")
        this.searchProduct = page.locator("h4>a")
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
}