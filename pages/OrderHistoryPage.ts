import {Page, Locator} from "@playwright/test"


export class OrderHistoryPage{

    private readonly page:Page
    private readonly orderHisHeaderTitle:Locator
    private readonly allrowLocator:Locator



    constructor(page:Page){
        this.page = page
        this.orderHisHeaderTitle = page.locator("#content h1")
        this.allrowLocator = page.locator("table.table.table-bordered.table-hover  tbody tr")

    }

    async isOrderHistoryPageExist():Promise<boolean>  
    {
        try{
            const headerTitle = await this.orderHisHeaderTitle.textContent()
            return headerTitle?.includes("Order History") ?? false
        }catch(error){
            return false
        }
    }

    async getCountOfAllRowsOrRecord(){
       return (await this.allrowLocator.all()).length
    }

}