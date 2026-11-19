import {test, expect} from "@playwright/test"


test("Get Product price for flipkart app", async ({page})=>{


    await page.goto("https://www.flipkart.com/")
    await page.waitForTimeout(2000)
     const closeBtn = page.locator(".b3wTlE")
    
    if(await closeBtn.isVisible()){
        await closeBtn.click()
    }
    await page.waitForTimeout(2000)
    await page.getByPlaceholder("Search for Products, Brands and More").first().fill("Laptop")
    await page.keyboard.press("Enter")
    await expect(page.getByText("Become a Seller").first()).toBeVisible()
    const cards = page.locator(".nZIRY7")
    const counts = await cards.count()
    console.log(`Total cards is ${counts}`)

    const ProductMap = new Map<string, string>()

    for(let i=0; i<counts; i++){

        const card = cards.nth(i)
        const nameLocator = card.locator(".RG5Slk")
        const PriceLocator = card.locator(".hZ3P6w.DeU9vF")

        const nameText = (await nameLocator.textContent())?.trim().split(' - ')[0]
        const priceText = (await PriceLocator.textContent())?.trim()

        if(nameText && priceText){
            ProductMap.set(nameText, priceText)
        }

    }
    const someProduct = "WarnerCann Hi5 pro Intel Core i5 12th Gen"
    if(ProductMap.has(someProduct)){
        console.log(`${someProduct} has its price is ${ProductMap.get(someProduct)}`)
    }

    for(const [name, price] of ProductMap){
        console.log(`${name} <==> ${price}`)
    }
   
})