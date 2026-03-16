import {Page, Locator} from "@playwright/test"

export class EditAddressPage{

    private readonly page:Page
    private readonly editAddressHeaderTitle:Locator
    private readonly fname:Locator
    private readonly lname:Locator
    private readonly btnContinue:Locator
    private readonly editAddressSuccessMsg:Locator


    constructor(page:Page){
        this.page = page
        this.editAddressHeaderTitle = page.locator("#content h2")
        this.fname = page.locator("#input-firstname")
        this.lname = page.locator("#input-lastname")
        this.btnContinue = page.locator("input[value='Continue']")
        this.editAddressSuccessMsg = page.locator(".alert.alert-success.alert-dismissible")
    }

    async isEditAddressPageExist(){
        try{
            const headerText = await this.editAddressHeaderTitle.innerText()
            return headerText.includes("Edit Address") ?? false
        }catch(error){
            console.log(`Address page is not exist`)
            return false
        }
    }

    async editFname(fname:string){
        await this.fname.clear()
        await this.fname.fill(fname)

    }

    async editLname(lname:string){
        await this.lname.clear()
        await this.lname.fill(lname)
    }

    async clickContinueBtn():Promise<void>
    {
        await this.btnContinue.click()
    }

    async getEditAddressConfirmationMsg():Promise<string>
    {
        return await this.editAddressSuccessMsg.textContent() ?? ''   
    }

}