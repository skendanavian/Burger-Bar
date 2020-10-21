const express = require('express');
const router = express.Router();
const {sendSms} = require('../api/index');
const {getMenu, addOrder, addOrderItems, getOrder, getOrderPrice, getTotalItems, setOrderStatus, getPhoneForOrder, estimateOrderTime} = require('../db');


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
  });


  router.get('/:orderId', (req, response) => {
    const orderId = req.params.orderId;
    let orderItems;
    let orderPrice;

    getOrder(db, orderId).then((res) => {
      console.log(res.rows);
      orderItems = res.rows;
      getOrderPrice(db, orderId).then((res) => {
        console.log(res.rows);
        orderPrice = res.rows;
        response.render('order-confirmation', {orderItems, orderId, orderPrice})
      }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
      });

    });
  });


  router.post('/:orderId/confirmation', (req, response) => {
    const orderId = req.params.orderId;
    const orderStatus = setOrderStatus(db, orderId, 'confirmed');
    const totalItems = getTotalItems(db, orderId);
    const itemList = getOrder(db, orderId);



    Promise.all([totalItems, itemList, orderStatus]).then(values => {
      console.log('orderitems', values[0].rows)
      console.log('itemList', values[1].rows)
      console.log('orderStatus', values[2].rows)
      //call calculate order time
      //get customer and user phone number

    }).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
  });




  return router;
};


 ///////Do Not Delete - These are the SMS Commands/////////////////

    //Send Order Info to Restaurant 
    // console.log(sendSms('Order Info', '+16479861087'));

    //calculate order time and send to customer 
    // console.log(sendSms('Order Info', 'customerNumber'));

    ///////////////////////////////////////////////////////////////