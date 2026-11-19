import { test as base } from "@playwright/test"


export type World = {
    username:string,
    userid: number,
    token: string
}


export const test = base.extend<{world:World}>({

    world: async({},use)=>{
        const world:World = {
            username:"",
            userid:0,
            token:""
        }

        await use(world)
    }
})

export { expect } from "@playwright/test"