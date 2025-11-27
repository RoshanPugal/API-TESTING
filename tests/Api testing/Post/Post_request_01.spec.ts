import { test, expect } from "@playwright/test";
import fs from "fs";

test("Verify the Api post method for json extract data", async ({ request }) => {

  const requestpath = "tests/test-data/booking_id.json"; // ensure correct file name
  const requestbody = JSON.parse(fs.readFileSync(requestpath, "utf-8"));

  // url fetch from baseurl at pw config.ts file (/booking) is endpoint 
  const response = await request.post("/booking",{data:requestbody})

  const responsebody = await response.json();
  console.log( responsebody);

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)  

  expect(responsebody).toHaveProperty('bookingid')
  expect(responsebody).toHaveProperty('booking')

  const booking = responsebody.booking;

  expect(booking).toMatchObject({
    firstname:requestbody.firstname,
    lastname:requestbody.lastname,
    totalprice:requestbody.totalprice,
    depositpaid:requestbody.depositpaid,
  })
  expect(booking.bookingdates).toMatchObject({
    checkin:requestbody.bookingdates.checkin,
    checkout:requestbody.bookingdates.checkout
  })
});
