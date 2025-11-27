import { faker } from "@faker-js/faker"
import { expect, test } from "@playwright/test"
import { DateTime } from "luxon"


test("Verify Post api using faker method",async({request})=>{

    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const totalprice = faker.number.int({min:500,max:5000})
    const depositpaid = faker.datatype.boolean()

    const checkindata = DateTime.now().toFormat('yyyy-mm-dd')
    const checkoutdata = DateTime.now().plus({days:5}).toFormat('yyyy-mm-dd')

    const requestbody = {
        firstname:firstname,
        lastname:lastname,
        totalprice:totalprice,
        depositpaid:depositpaid,
        bookingdates:{
            checkin:checkindata,
            checkout:checkoutdata,
        }
    }

    const response = await request.post('/booking',{data:requestbody})
    const responsebody =await response.json()

    // console.log(responsebody);

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    expect(responsebody).toHaveProperty('booking')
    expect(responsebody.booking).toHaveProperty('bookingdates')

    console.log(responsebody.bookingid);
    
})