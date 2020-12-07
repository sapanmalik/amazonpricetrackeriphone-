require('dotenv').config()
const sgmail=require('@sendgrid/mail')
sgmail.setApikey(PROCESS.env.SENDGRIP_API_KEY)


const nightmare = require('nightmare')()

checkprice()
async function checkprice(){
const pricestring=await nightmare.goto("https://www.amazon.in/New-Apple-iPhone-Pro-256GB/dp/B08L5V825S")
                                 .wait("#priceblock_ourprice")
                                 .evaluate(() =>
                                  document.getElementById
                                  ("priceblock_ourprice")
                                  .innerText)
                                 .end()


const priceNumber =parseFloat(pricestring.replace('₹',''))
if(priceNumber< 130000){
sendemail('lets buy this')
}
else {
console.log("buy next time  when price go down")
}
             
}


function sendemail(subject,body){
const email={
to:'pesexih975@5y5u.com',
from:'sapanmalik4567@gmail.com',
subject:price_checker,
text:body,
html:body
}
return sgmail.send(email)
}
