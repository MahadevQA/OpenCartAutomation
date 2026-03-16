import {Page, Locator} from "@playwright/test"
import { MyAccountPage } from "../pages/MyAccountPage"
import { AddAdressPage } from "../pages/AddAddressPage"
import { EditAddressPage } from "../pages/EditAddressPage"


export class AddressBookPage{

    private readonly page:Page
    private readonly addressBookHeaderTitle:Locator
    private readonly newAddressBtn:Locator
    private readonly newBackBtn:Locator
    private readonly editBtn:Locator
    private readonly deleteBtn:Locator
    private readonly deleteSuccessMsg:Locator


    constructor(page:Page){

        this.page = page
        this.addressBookHeaderTitle = page.locator("#content h2")
        this.newAddressBtn = page.locator("a:has-text('New Address')")
        this.newBackBtn = page.locator("a:has-text('Back')")
        this.editBtn = page.locator(".btn.btn-info").last()
        this.deleteBtn = page.locator("a:has-text('Delete')").last()
        this.deleteSuccessMsg = page.locator(".alert.alert-success.alert-dismissible")

    }

    async isAddressBookPageExist(){
        try{
            const headerText = await this.addressBookHeaderTitle.innerText()
            return headerText.includes("Address Book Entries") ?? false
        }catch(error){
            console.log(`Address page is not exist`)
            return false
        }
    }

    async clickNewAddressBtn():Promise<AddAdressPage>
    {
        await this.newAddressBtn.click()
        return new AddAdressPage(this.page)
    }

    async clickBackBtn():Promise<MyAccountPage>
    {
        await this.newBackBtn.click()
        return new MyAccountPage(this.page)
    }

    async clickEditBtn():Promise<EditAddressPage>
    {
        await this.editBtn.click()
        return new EditAddressPage(this.page)
    }

    async deleteLastAddressReturnWithSuccessMsg():Promise<boolean>
    {
        await this.deleteBtn.click()
        const result = (await this.deleteSuccessMsg.innerText()).includes("Your address has been successfully deleted") ?? false
        return result
    }


}
