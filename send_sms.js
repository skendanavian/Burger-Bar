// load .env data into process.env
require('dotenv').config();

console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


//change the 'to' field to your phone number to test!
client.messages
  .create({
     body: "What's going on?",
     from: '+16503534858',
     to: '+17089274496'
   })
  .then(message => console.log(message));
