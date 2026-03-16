import {Page, Locator, expect} from "@playwright/test"


export class WishListPage{

    private readonly page:Page
    private readonly wishListHeaderTitle:Locator  
    private readonly listProductName:Locator 
    private readonly removeBtn:Locator
    private readonly removeSuccessMsg:Locator
    private readonly allTableData:Locator

    constructor(page:Page){
        this.page = page
        this.wishListHeaderTitle = page.locator("#content h2")
        this.listProductName = page.locator(".table-responsive table tbody tr td:nth-child(2) a")
        this.removeBtn = page.locator("a.btn-danger")   
        this.allTableData = page.locator("table tbody tr")
        this.removeSuccessMsg = page.locator(".alert.alert-success.alert-dismissible")
    }

    async isWishListPageExists():Promise<boolean>
    {
        try{
            await this.page.waitForLoadState()
            const headerText = await this.wishListHeaderTitle.textContent()
            return headerText?.includes('My Wish List') ?? false
        }catch(error){
            return false
        }
    }

    async isProductExist(productName:string):Promise<boolean>
    {
        try{
            for(const product of await this.listProductName.all())
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

    async removeProductAndVerifySuccessMsg(productName: string) {
        const row = this.allTableData.filter({
            has: this.page.locator('td.text-left a', { hasText: productName })
          });
        
        await row.locator(this.removeBtn).click();
        await expect(this.removeSuccessMsg).toContainText("Success: You have modified your wish list!");
      }

}