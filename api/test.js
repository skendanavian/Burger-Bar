const { sendSms } = require('./index');

//put in your phone number with country code +XXXXXXXXXXX
console.log(sendSms('Test require!', '+yourphone'));
