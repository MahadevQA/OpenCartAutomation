import {Page, Locator, expect} from "@playwright/test"

export class AddAdressPage{

    private readonly page:Page
    private readonly txtFirstname:Locator
    private readonly txtLastname:Locator
    private readonly txtCompany:Locator
    private readonly txtAddress1:Locator
    private readonly txtAddress2:Locator
    private readonly txtCity:Locator
    private readonly txtPostcode:Locator
    private readonly drpdwnCountry:Locator
    private readonly drpdwnRegionOrState:Locator
    private readonly btnContinue:Locator
    private readonly addAddressSuccessMsg:Locator
    private readonly addAddressHeaderTitle:Locator


    constructor(page:Page){
        this.page = page
        this.txtFirstname = page.locator("#input-firstname")
        this.txtLastname = page.locator("#input-lastname")
        this.txtCompany = page.locator("#input-company")
        this.txtAddress1 = page.locator("#input-address-1")
        this.txtAddress2 = page.locator("#input-address-2")
        this.txtCity = page.locator("#input-city")
        this.txtPostcode = page.locator("#input-postcode")
        this.drpdwnCountry = page.locator("select[id='input-country']")
        this.drpdwnRegionOrState = page.locator("#input-zone")
        this.btnContinue = page.locator("input[value='Continue']")
        this.addAddressSuccessMsg = page.locator(".alert.alert-success.alert-dismissible")
        this.addAddressHeaderTitle = page.locator("#content h2")
    }


    async setFirstName(fname:string):Promise<void>
    {
        await this.txtFirstname.fill(fname)
    }

    async setLasttName(lname:string):Promise<void>
    {
        await this.txtLastname.fill(lname)
    }

    async setCompany(company:string){
        await this.txtCompany.fill(company)
    }

    async setAddress1(addres1:string){
        await this.txtAddress1.fill(addres1)
    }

    async setAddress2(addres2:string){
        await this.txtAddress2.fill(addres2)
    }

    async setCity(city:string){
        await this.txtCity.fill(city)
    }

    async setPincode(pincode:string){
        await this.txtPostcode.fill(pincode)
    }

    async selectCountry(conutry:string){
        await this.drpdwnCountry.selectOption({label:conutry})
    }

    async selectRegionOrState(state:string){
        await this.drpdwnRegionOrState.selectOption({label:state})
    }

    async clickContinueBtn():Promise<void>
    {
        await this.btnContinue.click()
    }

    async getAddAddressConfirmationMsg():Promise<string>
    {
        return await this.addAddressSuccessMsg.textContent() ?? ''
    }

    async isAddAdressPageExist():Promise<boolean>
    {
        const headerText = await this.addAddressHeaderTitle.innerText()
        return headerText.includes("Add Address") ?? false
    }

    async completeAddAddressForm(userdata:{
        firstname:string,
        lastname:string,
        company:string,
        address1:string,
        address2:string,
        city:string,
        postcode:string,
        //country:string,
        regOrState:string
    }):Promise<void>
    {
        await this.setFirstName(userdata.firstname)
        await this.setLasttName(userdata.lastname)
        await this.setCompany(userdata.company)
        await this.setAddress1(userdata.address1)
        await this.setAddress2(userdata.address2)
        await this.setCity(userdata.city)
        await this.setPincode(userdata.postcode)
        //await this.selectCountry(userdata.country)  // default keep 
        await this.selectRegionOrState(userdata.regOrState)
        await this.clickContinueBtn()
        await expect(this.addAddressSuccessMsg).toBeVisible()
    }


}