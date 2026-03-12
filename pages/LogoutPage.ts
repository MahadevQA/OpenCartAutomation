import {Page, Locator} from "@playwright/test"
import {HomePage} from '../pages/HomePage'


export class LogoutPage{

    private readonly page:Page
    private readonly continueBtn:Locator

    constructor(page:Page)
    {
        this.page = page
        this.continueBtn = page.locator(".btn.btn-primary")
    }

    async clickContinue():Promise<HomePage>
    {
        await this.continueBtn.click()
        return new HomePage(this.page)
    }

    async isContinueButtonVisible():Promise<boolean>
    {
        return await this.continueBtn.isVisible()
    }
}