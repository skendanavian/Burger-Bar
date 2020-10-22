const express = require('express');
const date = require('date-and-time');
const {formatOrderItems} = require('../helpers');
const {sendSms} = require('../api');
const {getIncompleteOrders, setOrderStatus, getPhoneForOrder} = require('../db');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, response) => {
    const {userId, isOwner} = req.session;
    getIncompleteOrders(db).then(res => {

      const orders = formatOrderItems(res.rows);
      orders.forEach(order => {
        order.created_at = date.format(order.created_at, 'ddd hh:mm A');
        return order;
      });
      if (isOwner) {
        response.render("kitchen", {orders, userId, isOwner});
      } else {
        response.render("error-message", {userId, isOwner, })
      }
    });
  });

  router.post('/:orderId/complete', (req, response) => {
    const {userId, isOwner} = req.session;
    const {orderId} = req.params;

    setOrderStatus(db, orderId, 'completed').then(
      response.redirect('/kitchen')
    ).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
  });

  router.post('/:orderId/ready', (req, response) => {
    const {userId, isOwner} = req.session;
    const {orderId} = req.params;

    getPhoneForOrder(db, orderId).then(res => {
      const phone = res.rows[0].phone;
      const msg = 'Your Burger Bar order is ready to be picked up!';
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
