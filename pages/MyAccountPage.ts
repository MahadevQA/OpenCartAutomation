import {Page, Locator} from "@playwright/test"
import { LogoutPage } from "../pages/LogoutPage"


export class MyAccountPage{

    private readonly page:Page
    private readonly msgHeading:Locator
    private readonly linkLogout:Locator


    constructor(page:Page){
        this.page = page
        this.msgHeading = page.locator("h2:has-text('My Account')")
        this.linkLogout = page.locator("a:has-text('Logout')").nth(1)
    }

    async isMyAccountPageExist():Promise<boolean>
    {
        try{
            const isVisible = await this.msgHeading.isVisible()
            return isVisible
        }
        catch(error){
            console.log(`My account page is not visible with error:${error}`)
            throw error
        }
    }

    async clickLogout():Promise<LogoutPage>
    {
        try{
            await this.linkLogout.click()
            return new LogoutPage(this.page)
        }catch(error){
            console.log(`Unable to click logout link: ${error}`)
            throw error
        }
    }

    async getPageTitle():Promise<string>
    {
        return (this.page.title())
    }

}
