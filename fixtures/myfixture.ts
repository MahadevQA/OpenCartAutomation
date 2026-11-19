import {test as mytest, Page} from "@playwright/test"


type myfixtures = {
    fixture1:string;
    loggedInFixture: Page
}

type workerFixture = {
    workerFixture1: string;

}

export const test = mytest.extend<myfixtures, workerFixture>({

    fixture1: async({}, use)=>{
        const fixture1 = "my fixture1"
        console.log("Before part of fixture 1");
        await use(fixture1);
        console.log("after part of fixture 1")
    },

    workerFixture1: [
        async({}, use)=>{
        const fixture1 = "my worker fixture1"
        console.log("Before part of worker fixture 1");
        await use(fixture1);
        console.log("after part of worker fixture 1")
    }, {scope:"worker"}],

    loggedInFixture: async({page}, use)=>{
        await page.goto("");
        await page.locator("").fill("username");
        await page.locator("").fill("password");
        await page.locator("").click();
        await use(page);  // execute in testcase this part
        await page.locator("").click()  // click on logout button
    }
})