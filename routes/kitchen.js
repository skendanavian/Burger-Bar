const express = require('express');
const {formatOrderItems} = require('../helpers');
const {sendSms} = require('../api');
const {getIncompleteOrders, setOrderStatus, getPhoneForOrder} = require('../db');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, response) => {

    getIncompleteOrders(db).then(res => {
      const orders = formatOrderItems(res.rows);
      response.render("kitchen", {orders});
    });
  });

  router.post('/:orderId/complete', (req, response) => {
    const {orderId} = req.params;

    setOrderStatus(db, orderId, 'completed').then(
      response.redirect('/kitchen')
    ).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
  });

  router.post('/:orderId/ready', (req, response) => {
    const {orderId} = req.params;

    getPhoneForOrder(db, orderId).then(res => {
      const phone = res.rows[ 0 ].phone;
      const msg = 'Your order is ready to be picked up!';
      console.log(`Sent '${msg}' to ${phone}!`);
      /* KEEP! sms functionality to be uncommented*/
      // sendSms(msg, phone);
    }

    );

    setOrderStatus(db, orderId, 'ready').then(
      response.redirect('/kitchen')
    ).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
  });

  return router;
};
