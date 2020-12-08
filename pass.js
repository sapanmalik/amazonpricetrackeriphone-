require('dotenv').config()
const sgmail=require('@sendgrid/mail')
sgmail.setApikey(PROCESS.env.SENDGRIP_API_KEY)   // in   .env file give your generated API key 
//this for api 

const nightmare = require('nightmare')()

checkprice()
async function checkprice(){
const pricestring=await nightmare.goto("https://www.amazon.in/New-Apple-iPhone-Pro-256GB/dp/B08L5V825S") //you can change the url to track others iphone 
                                 .wait("#priceblock_ourprice")
                                 .evaluate(() =>
                                  document.getElementById
                                  ("priceblock_ourprice")
                                  .innerText)
                                 .end()


const priceNumber =parseFloat(pricestring.replace('₹',''))
if(priceNumber< 130000){                                    //you can change your price according to your budget 
 await sendEmail(
        'Price Is Low',
        `The price on ${"https://www.amazon.in/New-Apple-iPhone-Pro-256GB/dp/B08L5V825S"} has dropped below ${130000}`            
      )                     //change what to message you want send to your 
                            //${minPrice} put you minprice you want to
                             // ${url} put your url to change
}
else {
console.log("buy next time  when price go down")          //change the esle statement from this line if you want to change 
}
             
}


function sendEmail(subject,body){                       ///send mail 
const email={
to:'pesexih975@5y5u.com',                               //this is send by the online emulator which generate one time mail for our use 
from:'sapanmalik4567@gmail.com',                        //this the email of me for testing you can use any of yours
subject:price_checker,
text:body,
html:body
}
return sgmail.send(email)
}
