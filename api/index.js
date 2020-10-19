require('dotenv').config();

// Your Account Sid and Auth Token from twilio.com/console
// must copy in values to your .env file

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = {

    sendSms: function (msg, phone) {
      return client.messages
        .create({
          body: `${msg}`,
          from: '+16503534858',
          to: `${phone}`
        })
        .then(message => console.log(message));
    }

}




