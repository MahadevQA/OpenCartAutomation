import {test} from '../fixtures/myfixture.ts'
import {expect} from "@playwright/test"


test("fixtures demo practice1", async({fixture1})=>{
    console.log(fixture1)
})


test("fixtures demo practice2", async({fixture1})=>{
    console.log(fixture1)
})

test("fixtures login demo practice3", async({loggedInFixture})=>{
    await loggedInFixture.locator("").click();
    await expect(loggedInFixture).toHaveTitle("")
})