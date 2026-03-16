import {Page, Locator} from "@playwright/test"


export class ChangePasswordPage{

    private readonly page:Page
    private readonly chngPwdHeaderTitle:Locator
    private readonly txtPassword:Locator
    private readonly txtConfirmPassword:Locator
    private readonly continueBtn:Locator


    constructor(page:Page){
        this.page = page
        this.chngPwdHeaderTitle = page.locator("#content h1")
        this.txtPassword = page.locator("#input-password")
        this.txtConfirmPassword = page.locator("#input-confirm")
        this.continueBtn = page.locator("input[value='Continue']")

    }

    async isChangePasswordPageExist():Promise<boolean>
    {
        const headertText = await this.chngPwdHeaderTitle.innerText()
        return headertText.includes("Change Password") ?? false
    }

    async enterPassword(pwd:string){
        await this.txtPassword.fill(pwd)
    }

    async enterConfirmPassword(cpwd:string){
        await this.txtConfirmPassword.fill(cpwd)
    }

    async clickOnContinueBtn(){
        await this.continueBtn.click()
    }
}