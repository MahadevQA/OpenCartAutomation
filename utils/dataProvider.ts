import fs from 'fs'
import {parse} from "csv-parse/sync"
import * as xlsx from "xlsx"


export class dataProvider{

    // Read json data and return data in array format
    static getTestDataFromJSON(filepath:string):any
    {
        let data:any = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
        return data
    }

    // Reading data from .csv file
    static getTestDataFromCSV(filepath:string):any
    {

        let data:any = parse(fs.readFileSync(filepath),{columns:true, skip_empty_lines:true})
        return data
    }

    // Reading data from .xlsx file
    static getTestDataFromEXCEL(xlsxFilepath:string):any
    {
        const workbook = xlsx.readFile(xlsxFilepath)    
        const sheetname = workbook.SheetNames[0]   
        const worksheet = workbook.Sheets[sheetname]   
        const data:any = xlsx.utils.sheet_to_json(worksheet)  
        return  data
    }
}