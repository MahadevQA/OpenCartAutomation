import {test, expect} from "../fixtures/worldFixture"


test("create and strore dynamic data", async({page, world})=>{

    world.token = "654dtsretxztrxyuayxr"
    world.userid = 105
    world.username = `TestUser_${Date.now()}`

    console.log(`Token is - ${world.token}`)
    console.log(`UserID is - ${world.userid}`)
    console.log(`Username is - ${world.username}`)

})