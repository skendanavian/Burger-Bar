// load .env data into process.env
require('dotenv').config();

// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Test me again!',
     from: '+16503534858',
     to: '+17089274496'
   })
  .then(message => console.log(message));
