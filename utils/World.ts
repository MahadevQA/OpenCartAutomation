import {TestData} from "../utils/customDataTypes"


export class World{

    private data:TestData = {}

    set<K extends keyof TestData>( key:K, value: TestData[K]): void 
    {
        this.data[key] = value;
    }


    get<K extends keyof TestData>( key:K ):TestData[K]
    {
        return this.data[key];
    }


    update(updatedData: Partial<TestData>):void
    {
        this.data = {
            ...this.data,
            ...updatedData
        };
    }

    getAll():TestData
    {
        return this.data;
    }

    clear():TestData
    {
        return this.data = {};
    }
    
}

