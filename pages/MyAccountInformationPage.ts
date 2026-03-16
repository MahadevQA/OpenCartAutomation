import {Page, Locator} from "@playwright/test"


export class MyAccountInformationPage{


    private readonly page:Page
    private readonly fname:Locator
    private readonly lname:Locator
    private readonly email:Locator
    private readonly phone:Locator
    private readonly MyAccHeaderTitle:Locator
    private readonly successMsgConfirmation:Locator
    private readonly continueBtn:Locator

    constructor(page:Page){
        this.page = page
        this.fname = page.locator("#input-firstname")
        this.lname = page.locator("#input-lastname")
        this.email = page.locator("#input-email")
        this.phone = page.locator("#input-telephone")
        this,this.MyAccHeaderTitle = page.locator("#content h1")
        this.successMsgConfirmation = page.locator(".alert.alert-success.alert-dismissible")
        this.continueBtn = page.locator("input[value='Continue']")
    }

    async updateFName(fname:string){
        await this.fname.fill('')
        await this.fname.fill(fname)
    }

    async updateLName(lname:string){
        await this.lname.fill('')
        await this.lname.fill(lname)
    }

    async updatePhoneNum(phone:string){
        await this.phone.fill('')
        await this.phone.fill(phone)
    }

    async updateEmail(email:string){
        await this.email.fill('')
        await this.email.fill(email)
    }

    async isMyAccountInformationPageExist():Promise<boolean>
    {
        const headerText = await this.MyAccHeaderTitle.innerText()
        return headerText.includes("My Account Information") ?? false
    }

    async isSuccessMessageDisplyed():Promise<boolean>
    {
       const msg = await this.successMsgConfirmation.innerText()
       return msg.includes("Success: Your account has been successfully updated.") ?? false
    }

    async clickContinueBtn(){
        await this.page.waitForLoadState()
        await this.continueBtn.click()
    }

}