import {Page, Locator, expect} from "@playwright/test"


export class CheckoutPage{
    private readonly page:Page
    private readonly radioNewAddressbtn:Locator
    private readonly txtFirstname:Locator
    private readonly txtLastname:Locator
    private readonly txtCompany:Locator
    private readonly txtAddress1:Locator
    private readonly txtAddress2:Locator
    private readonly txtCity:Locator
    private readonly txtPostcode:Locator
    private readonly drpdwnCountry:Locator
    private readonly drpdwnRegionOrState:Locator
    private readonly btnBillingDetails:Locator
    private readonly txtDeliveryMethods:Locator
    private readonly txtPaymentMethods:Locator
    private readonly checboxTandC:Locator
    private readonly btnConfirmOrder:Locator
    private readonly successOrderPlaceMsg:Locator
    private readonly btnDeliveryDetails:Locator  
    private readonly btnDeliveryMethods:Locator  
    private readonly btnPaymentMethods:Locator   

    constructor(page:Page){
        this.page = page
        //this.radioGuest = page.locator("")
        this.radioNewAddressbtn = page.locator("#collapse-payment-address form input[type='radio'][value='new']")
        this.txtFirstname = page.locator("#input-payment-firstname")
        this.txtLastname = page.locator("#input-payment-lastname")
        this.txtCompany = page.locator("#input-payment-company")
        this.txtAddress1 = page.locator("#input-payment-address-1")
        this.txtAddress2 = page.locator("#input-payment-address-2")
        this.txtCity = page.locator("#input-payment-city")
        this.txtPostcode = page.locator("#input-payment-postcode")
        this.drpdwnCountry = page.locator("#input-payment-country")
        this.drpdwnRegionOrState = page.locator("#input-payment-zone")
        this.btnBillingDetails = page.locator("#button-payment-address")
        this.txtDeliveryMethods = page.locator("#collapse-shipping-method textarea.form-control")
        this.txtPaymentMethods = page.locator("#collapse-payment-method textarea.form-control")
        this.checboxTandC = page.locator("input[name='agree']")
        this.btnConfirmOrder = page.locator("#button-confirm")
        this.successOrderPlaceMsg = page.locator("#content h1")
        this.btnDeliveryDetails = page.locator("#button-shipping-address")
        this.btnDeliveryMethods = page.locator("#button-shipping-method")
        this.btnPaymentMethods = page.locator("#button-payment-method")
    }

    async isCheckoutPageExist():Promise<boolean>
    {
        try{
            await expect(this.page).toHaveTitle("Checkout")
            return true
        }catch(error){
            return false
        }
    }

    async selectNewBllingDetails(){
        await this.radioNewAddressbtn.click()
    }

    async chooseCheckoutOption(checkoutOption:string)
    {
        if(checkoutOption==='Guest Checkout'){
            //await this.radioGuest.click()
        }
    }

    async clickOnBtnBillingDetailsContinuebtn(){
        await this.btnBillingDetails.click()
    }

    async clickOnBtnDeliveryDetailsContinuebtn(){
        await this.btnDeliveryDetails.click()
    }

    async clickOnBtnDeliveryMethodsContinuebtn(){
        await this.btnDeliveryMethods.click()
    }

    async clickOnBtnPaymentMethodsContinuebtn(){
        await this.btnPaymentMethods.click()
    }

    async setFirstname(firstname:string){
        await this.txtFirstname.fill(firstname)
    }

    async setLastname(lasttname:string){
        await this.txtLastname.fill(lasttname)
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

    async enterDeleiveryMethodsMsg(message:string){
        await this.txtDeliveryMethods.fill(message)
    }

    async enterPaymentMethodsMsg(message:string){
        await this.txtPaymentMethods.fill(message)
    }

    async selectTandCCheckbox(){
        await this.checboxTandC.check()
    }

    async clickConfirmOrder(){
        await this.btnConfirmOrder.click()
    }

    async isSuccessOrderPlaceMsgDisplayed(){
        return await this.successOrderPlaceMsg.isVisible()
    }

    async checkoutFlow(userdata:{
        firstname:string,
        lastname:string,
        companyName:string,
        address1:string,
        address2:string,
        city:string,
        postcode:string,
        country:string,
        regionOrState:string,
        textMessage:string

    }){
        //await this.selectNewBllingDetails()
        await this.setFirstname(userdata.firstname)
        await this.setLastname(userdata.lastname)
        await this.setCompany(userdata.companyName)
        await this.setAddress1(userdata.address1)
        await this.setAddress2(userdata.address2)
        await this.setCity(userdata.city)
        await this.setPincode(userdata.postcode)
        await this.selectCountry(userdata.country)
        await this.selectRegionOrState(userdata.regionOrState)
        await this.clickOnBtnBillingDetailsContinuebtn()
        await this.clickOnBtnDeliveryDetailsContinuebtn()
        await this.enterDeleiveryMethodsMsg(userdata.textMessage)
        await this.clickOnBtnDeliveryMethodsContinuebtn()
        await this.enterPaymentMethodsMsg(userdata.textMessage)
        await this.selectTandCCheckbox()
        await this.clickOnBtnPaymentMethodsContinuebtn()
        await this.clickConfirmOrder()
        const placeOrderMsg = await this.isSuccessOrderPlaceMsgDisplayed()
        expect(placeOrderMsg).toBeTruthy()
    }
}