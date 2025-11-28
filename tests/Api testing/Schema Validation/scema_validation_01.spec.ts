/*
Schema Validation = 
its a one of the type of the json validation 
and it is a rules of the json 
(our response json and request json is = to the actual recived json)

ex: 
actual result====>  "name":"Roshan"
schema validation ==>"name": "string"

if recived result is string schema validation is pass or not schema validation is fails 

schema validation throw boolen type == true / false
*/

import{test,expect} from"@playwright/test"
import   Ajv  from 'ajv'
import fs from "fs"

function jsonfile(){
    return JSON.parse(fs.readFileSync('tests/Api testing/Schema Validation/schema.json','utf-8'))
}

test('Verify the Schema Validation',async({request})=>{

    const getrequest = await request.get('https://mocktarget.apigee.net/json')
    const response = await getrequest.json()

    expect(getrequest.ok()).toBeTruthy()
    
    const schemareport = jsonfile()
    const ajv = new Ajv()

    const validate = ajv.compile(schemareport)
    const isvalid = validate(response)
    console.log(isvalid);
    expect(isvalid).toBeTruthy()  
})
