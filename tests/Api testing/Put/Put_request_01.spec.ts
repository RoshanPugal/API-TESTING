import{test,expect} from "@playwright/test"
import fs from "fs"
import { loadavg } from "os"

function readfile(filepath:string){
    return JSON.parse(fs.readFileSync(filepath,'utf-8'))
}

test("Verify the Put method with chain api",async({request})=>{


    // create a booking id with post request

    const requestbody = readfile('tests/test-data/booking_id.json')
    const createresponse = await request.post('/booking',{data:requestbody})
    expect(createresponse.ok()).toBeTruthy()

    const createresponsebody = await createresponse.json()
    const bookingid = createresponsebody.bookingid

    console.log("Booking id is ---->",bookingid)

    // create a token with post request

    const tokenrequest = readfile('tests/test-data/Token_body.json')
    const tokenresponse = await request.post('/auth',{data:tokenrequest})
    const tokenid = await tokenresponse.json()
    expect(tokenresponse.ok()).toBeTruthy()

    const token = tokenid.token
    console.log("Token id is ---->",token)

    // update the json using put request

    const updaterequest = readfile('tests/test-data/update_id.json')
    const updateresponse = await request.put(`/booking/${bookingid}`,{headers:{"Cookie":`token=${token}`},data:updaterequest})

    expect(updateresponse.ok()).toBeTruthy()
    expect(updateresponse.status()).toBe(200)

    const updateresponsebody = await updateresponse.json()
    console.log(updateresponsebody);
})