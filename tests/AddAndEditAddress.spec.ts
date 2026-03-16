import {test, expect} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { AddAdressPage } from "../pages/AddAddressPage"
import { EditAddressPage } from "../pages/EditAddressPage"
import { AddressBookPage } from "../pages/AddressBookPage"
import { RandomData } from "../utils/randomDataGen"
 
 
let homePage:HomePage
let config:TestConfig
let loginPage:LoginPage
let myAccountPage:MyAccountPage
let addAddressPage:AddAdressPage
let editAddressPage:EditAddressPage
let addressBookPage:AddressBookPage

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    config = new TestConfig
    loginPage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
    addAddressPage = new AddAdressPage(page)
    editAddressPage = new EditAddressPage(page)
    addressBookPage = new AddressBookPage(page)
    await page.goto(config.appUrl)
    await homePage.clickMyAccount()
    await homePage.clickLogin()
    await loginPage.login(config.email, config.password)
    expect(await myAccountPage.isMyAccountPageExist()).toBeTruthy()
    await myAccountPage.clickModifyYourAddBookEntries()
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(5000)
    await page.close()
})


test.describe.serial("Address creation and deletion flow",{tag:['@address']}, async()=>{
    
    test("Add new Address",{tag:['@master', '@regression']}, async()=>{
    
        await addressBookPage.clickNewAddressBtn()
        expect(await addAddressPage.isAddAdressPageExist()).toBeTruthy()
    
        const userData = {
            firstname:RandomData.getFirstName(),
            lastname:RandomData.getLastName(),
            company:config.companyName,
            address1:config.address1,
            address2:config.address2,
            city:config.city,
            postcode:config.postcode,
            //country:config.country,
            regOrState:config.regionOrState
        }
        await addAddressPage.completeAddAddressForm(userData)
        expect(await addressBookPage.isAddressBookPageExist()).toBeTruthy()
    })

    test("Verify Address Book page is display",{tag:['@master', '@regression']}, async()=>{
        expect(await addressBookPage.isAddressBookPageExist()).toBeTruthy()
    })
    
    test("Edit or update Existing addres",{tag:['@master', '@regression']}, async()=>{
        expect(await addressBookPage.isAddressBookPageExist()).toBeTruthy()
        await addressBookPage.clickEditBtn()
        expect(await editAddressPage.isEditAddressPageExist()).toBeTruthy()
        await editAddressPage.editFname(RandomData.getFirstName())
        await editAddressPage.editLname(RandomData.getLastName())
        await editAddressPage.clickContinueBtn()
        expect(await editAddressPage.getEditAddressConfirmationMsg()).toContain("Your address has been successfully updated")
    })
    
    
    test("Delete Existing Book Entries",{tag:['@master', '@regression']}, async()=>{
        expect(await addressBookPage.isAddressBookPageExist()).toBeTruthy()
        expect(await addressBookPage.deleteLastAddressReturnWithSuccessMsg()).toBeTruthy()
    })

})

