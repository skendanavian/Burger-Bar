const express = require('express');
const router = express.Router();
const {sendSms} = require('../api/index');
const {getMenu, addOrder, addOrderItems, getOrder} = require('../db');


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
    let newOrderId;
    addOrder(db, {userId: 3, ownerId: 1}).then(res => {
      newOrderId = res.rows[0].id;
      console.log('this is new order', newOrderId);
      return addOrderItems(db, newOrderId, items);
    }).then((res) => {
      response.redirect(`order/${newOrderId}`);
    }).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });


    ///////Do Not Delete - These are the SMS Commands/////////////////

    //Send Order Info to Restaurant 
    // console.log(sendSms('Order Info', '+16479861087'));

    //calculate order time and send to customer 
    // console.log(sendSms('Order Info', 'customerNumber'));

    ///////////////////////////////////////////////////////////////


    // insert order into db
    // add order to kitchen runner page
    // add btn to kitchen runner which marks order as complete
    // DB helper - calculate time for order
    // Message customer the estimated time
    // send 
    // sendmessage - order
    //kitchen runner page - complete order. -- 

  });


  router.get('/:orderId', (req, response) => {
    const orderId = req.params.orderId;

    getOrder(db, orderId).then(
      (res) => {
        console.log(res.rows);
        const orderItems = res.rows;
        response.render('order-confirmation', {orderItems, orderId})

      }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
      });

  });

  return router;
};