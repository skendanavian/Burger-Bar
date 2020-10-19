const express = require('express');
const router  = express.Router();
const { sendSms } = require('../api/index');


module.exports = (db) => {

router.get('/', (req, res) => {
  res.render("order");
});

router.post('/', (req, res) => {


//Send Order Info to Restaurant 
  console.log(sendSms('Order Info', '+16479861087'));

  console.log(sendSms('Order Info', 'customerNumber'));
  // insert order into db
  // add order to kitchen runner page
  // add btn to kitchen runner which marks order as complete or not
  // DB helper - calculate time for order
  // Message customer the estimated time
  // send 
  // sendmessage - order
  //kitchen runner page - complete order. -- 
  
});




//POST: /orders/sms
// router.post('/sms', (req,res) => {
  
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());


// })


  return router;
};