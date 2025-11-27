import{test,expect} from "@playwright/test"
import fs from "fs"

function jsonfile(filepath:string){
    return JSON.parse(fs.readFileSync(filepath,'utf-8'))
}

test("Partial update using Patch method",async({request})=>{

    // create a new order and fetch the booking id

    const createdata =jsonfile('tests/test-data/booking_id.json')
    const postrequest = await request.post('/booking',{data:createdata})
    const postresponse = await postrequest.json()
    const bookingid = postresponse.bookingid
    expect(postrequest.ok()).toBeTruthy()
    console.log("Booking id is====>",bookingid);

    //create a new token use post method

    const tokenpath = jsonfile('tests/test-data/Token_body.json')
    const tokenrequest = await request.post('/auth',{data:tokenpath})
    const tokenresponse = await tokenrequest.json()
    const token =tokenresponse.token
    expect(tokenrequest.ok()).toBeTruthy()
    console.log("Token id is ===>",token)

    //Partiayally update the details for using Patch method

    const patchpath = jsonfile('tests/test-data/Partial_update.json')
    const pathrequest = await request.patch(`/booking/${bookingid}`,{headers:{"cookie":`token=${token}`},data:patchpath})
    const pathresponse = await pathrequest.json()
    expect(pathrequest.ok()).toBeTruthy()
    expect(pathrequest.status()).toBe(200)
    console.log(pathresponse)
    console.log(pathrequest.statusText())
    console.log(pathrequest.status()); 
})