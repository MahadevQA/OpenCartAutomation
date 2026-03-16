import {Page, Locator} from "@playwright/test"
import { LogoutPage } from "../pages/LogoutPage"


export class MyAccountPage{

    private readonly page:Page
    private readonly msgHeading:Locator
    private readonly linkLogout:Locator
    private readonly linkModifyAddress:Locator
    private readonly linkAccountInformation:Locator
    private readonly linkChangeYourPwd:Locator
    private readonly linkRegForAffilateAccount:Locator
    private readonly successMsg:Locator


    constructor(page:Page){
        this.page = page
        this.msgHeading = page.locator("h2:has-text('My Account')")
        this.linkLogout = page.locator("a:has-text('Logout')").nth(1)
        this.linkModifyAddress = page.locator("li a:has-text('Modify your address book entries')")
        this.linkAccountInformation = page.locator("li a:has-text('Edit your account information')")
        this.linkChangeYourPwd = page.locator("li a:has-text('Change your password')")
        this.linkRegForAffilateAccount = page.locator("li a:has-text('Register for an affiliate account')")
        this.successMsg = page.locator(".alert.alert-success.alert-dismissible")
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

    async clickModifyYourAddBookEntries(){
        await this.linkModifyAddress.click()
    }

    async clickEditYourAccountInfo(){
        await this.linkAccountInformation.click()
    }

    async clickChangeYourPasswordLink(){
        await this.linkChangeYourPwd.click()
    }

    async clickRegisForAffilateAccountLink(){
        await this.linkRegForAffilateAccount.click()
    }

    async isSuccessMessageDisplayed():Promise<boolean>
    {
        return await this.successMsg.isVisible()
    }

}
