/*
1) No Auth
2)Basic auth (its have usename & password)
3)Bearer Token (its have some token)
4)Api key Auth (its have key & value)
*/

import {test,expect} from "@playwright/test"

//Basic Auth

test("Basic Auth using Get method with user& pass",async({request})=>{

    const basicrequest = await request.get('https://httpbin.org/basic-auth/user/pass',{headers:
                                                        {Authorization:`Basic `+Buffer.from("user:pass").toString('base64')}})

    const basicresponse = await basicrequest.json()
    console.log(basicresponse);
    expect(basicrequest.ok()).toBeTruthy()
    expect(basicrequest.status()).toBe(200)
    expect(basicresponse).toHaveProperty('user')                                                    
})

//Bearer Token

test("Bearer Token using get Method",async({request})=>{

    const Bearertoken = ''
    const bearerequest = await request.get('https://github.com/user',{headers:{Authorization:`Bearer ${Bearertoken}`}})

    expect(bearerequest.ok()).toBeTruthy()
    expect(bearerequest.status()).toBe(200)  
})


//Api Key Auth

test.only("Api key Auth using get method",async({request})=>{

    const apikey = ''
    const keyrequest = await request.get('https://openweathermap.org/price',{params:{appid:`${apikey}`}})

    // const keyresponse = await keyrequest.json()
    expect(keyrequest.ok()).toBeTruthy()
    expect(keyrequest.status()).toBe(200)

    // console.log(keyresponse);
    
})