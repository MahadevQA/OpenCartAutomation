import {Page,Locator} from "@playwright/test"


export class LoginPage{

    private readonly page:Page
    private readonly txtEmailAddress:Locator
    private readonly txtPassword:Locator
    private readonly loginBtn:Locator
    private readonly linkForgetPassword:Locator
    private readonly txtErrorMessage:Locator


    constructor(page:Page){
        this.page = page
        this.txtEmailAddress = page.locator("#input-email")
        this.txtPassword = page.locator("#input-password")
        this.loginBtn = page.locator("input[value='Login']")
        this.linkForgetPassword = page.locator("a:has-text('Forgotten Password')")
        this.txtErrorMessage = page.locator(".alert.alert-danger.alert-dismissible")
    }

    async enterEmail(email:string){
        await this.txtEmailAddress.fill(email)
    }

    async enterPassword(password:string){
        await this.txtPassword.fill(password)
    }
    
    async clickForgetPasswordLink(){
        await this.linkForgetPassword.click()
    }

    async clickLoginBtn(){
        await this.loginBtn.click()
    }

    async login(email:string, password:string){
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.clickLoginBtn()   
    }

    async getLoginErrorMessage():Promise<null | string>
    {
        return (this.txtErrorMessage.textContent())
    }
}

