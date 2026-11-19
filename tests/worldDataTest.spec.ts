import {test} from "@playwright/test";
import { World } from "../utils/World";

test("dynamic world data test", async ()=>{

    const world = new World();

    world.set("username","TestUser")
    world.set("password","Pass@123")
    world.set("userID", 452201)
    world.set("bookingId", 1011)

    const username = world.get("username")
    console.log(username)
    console.log(world.get("password"))
    console.log(world.get("userID"))
    console.log(world.get("bookingId"))

    console.log(world.getAll())

    const updateddata = world.update({
        "bookingId":1012,
        "password":"Pass@123",
        "userID":452202,
    })

    console.log(world.getAll())

    console.log(world.clear())

})