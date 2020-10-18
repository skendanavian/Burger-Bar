// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACcf8d0b637095949ddb03f816fa61b73e';
const authToken = 'b440a31ca561193c5ea75ac4de9127fe';
const client = require('twilio')(accountSid, authToken);


//change the 'to' field to your phone number to test!
client.messages
  .create({
     body: 'Example text!',
     from: '+16503534858',
     to: 'change me!'
   })
  .then(message => console.log(message.sid));
