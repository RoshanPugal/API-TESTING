import{test,expect}from "@playwright/test"
import { it } from "node:test";

test("Verify the Get Request for path params",async({request})=>{

    const bookingid = 145

    const response = await request.get(`booking/${bookingid}`)
    const responsebody = await response.json();
    console.log(responsebody);

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)   
})

test("Verify the Get Request for Query Params",async({request})=>{

    const firstname = "Jane"
    const lastname = "Doe"

    const response = await request.get("/booking",{params:{firstname,lastname}})
    const responsebody = await response.json()

    console.log(responsebody);

    expect(responsebody.length).toBeGreaterThan(0)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    for(const item of responsebody){
        expect(item).toHaveProperty('bookingid')
        expect(typeof item.bookingid).toBe('number')
        expect(item.bookingid).toBeGreaterThan(0)
    }
    



})