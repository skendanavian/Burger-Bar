const express = require('express');
const router = express.Router();
const {sendSms} = require('../api/index');
const {getMenu, addOrder, addOrderItems} = require('../db');


module.exports = (db) => {

  router.get('/', (req, response) => {
    getMenu(db).then(res => {
      //mentor note - implement ejs to handle errors, null data etc
      const menuItems = res.rows;
      response.render("order", {menuItems});
    });



  });


  router.post('/', (req, response) => {
    const ownerId = 1;
    // assign userId to var from cookies

    const items = req.body;
    addOrder(db, {userId: 1, ownerId: 1}).then(res => {
      const newOrderId = res.rows[0];
      console.log('this is new order', newOrderId);
      addOrderItems(db, newOrderId, items);
    }).catch((err) => err);


    ///////Do Not Delete - These are the SMS Commands/////////////////

    //Send Order Info to Restaurant 
    // console.log(sendSms('Order Info', '+16479861087'));

    //calculate order time and send to customer 
    // console.log(sendSms('Order Info', 'customerNumber'));

    ///////////////////////////////////////////////////////////////


    // insert order into db
    // add order to kitchen runner page
    // add btn to kitchen runner which marks order as complete or not
    // DB helper - calculate time for order
    // Message customer the estimated time
    // send 
    // sendmessage - order
    //kitchen runner page - complete order. -- 

  });


  return router;
};