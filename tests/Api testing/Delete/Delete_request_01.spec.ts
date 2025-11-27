import{test,expect}from"@playwright/test"
import fs from 'fs'
import { json } from "stream/consumers"


function jsonfile(filepath:string){
   return JSON.parse(fs.readFileSync(filepath,'utf-8'))
}

test("Delet methoad for end to end test",async({request})=>{

    //create the new booking id with post request and fetch the booking id

    const postjsonpath = jsonfile('tests/test-data/booking_id.json')
    const postrequest=await request.post('/booking',{data:postjsonpath})
    const postresponse = await postrequest.json()
    const bookingid=postresponse.bookingid
    expect(postrequest.ok()).toBeTruthy()
    console.log("Booking id is ====>",bookingid);

    // check the booking details using get method

    const getrequest =await request.get(`/booking/${bookingid}`)
    const getresponse = await getrequest.json()
    expect(getrequest.ok()).toBeTruthy()
    console.log(getresponse);

    //generate the new token using post method

    const tokenpath = jsonfile('tests/test-data/Token_body.json')
    const tokenrequest = await request.post('/auth',{data:tokenpath})
    const tokenresponse = await tokenrequest.json()
    const token = tokenresponse.token
    expect(tokenrequest.ok()).toBeTruthy()
    console.log("Token id id ===>",token);
    
    //update the details using put method

    const updatepath = jsonfile('tests/test-data/update_id.json')
    const updaterequest = await request.put(`/booking/${bookingid}`,{headers:{"cookie":`token=${token}`},data:updatepath})
    const updateresponse = await updaterequest.json()
    expect(updaterequest.ok()).toBeTruthy()
    console.log(updateresponse)

    //delete the booking using delete method
    
    const deleterequest = await request.delete(`/booking/${bookingid}`,{headers:{"cookie":`token=${token}`}})
    expect(deleterequest.status()).toBe(201)
    console.log(deleterequest.statusText(),deleterequest.status())   
})