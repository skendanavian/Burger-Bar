const express = require('express');
const router = express.Router();
const {sendSms} = require('../api/index');
const {getMenu, addOrder, addOrderItems, getOrder, getOrderPrice, getTotalItems, setOrderStatus, setOrderDesc, getOwnerPhone} = require('../db');
const {estimateOrderTime, renderOrderSms} = require('../helpers');


module.exports = (db) => {

  router.get('/', (req, response) => {
    const {userId, isOwner} = req.session;
    getMenu(db).then(res => {
      //mentor note - implement ejs to handle errors, null data etc
      const menuItems = res.rows;
      if (userId) {
        const errorMessage = null;
        response.render("order", {menuItems, userId, isOwner, errorMessage});
      } else {
        response.redirect('login')
      }
    });
  });


  router.post('/', (req, response) => {
    const {userId, isOwner} = req.session;
    const items = req.body;

    const emptyCheck = Object.values(items).every(val => !Array.isArray(val));
    if (emptyCheck) {
      const errorMessage = 2;
      getMenu(db).then(res => {
        const menuItems = res.rows;
        response.render("order", {menuItems, userId, isOwner, errorMessage});
      });
    };

    let newOrderId;
    addOrder(db, {userId, ownerId: 1}).then(res => {
      newOrderId = res.rows[0].id;
      return addOrderItems(db, newOrderId, items);
    }).then((res) => {
      req.session.userOrderId = newOrderId;
      console.log(req.session.userOrderId)
      response.redirect(`order/${newOrderId}`);
    }).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });

  });


  router.get('/:orderId', (req, response) => {
    const {userId, isOwner, userOrderId} = req.session;
    const orderId = req.params.orderId;
    let orderItems;
    let orderPrice;

    if (userOrderId == orderId) {
      getOrder(db, orderId).then((res) => {

        orderItems = res.rows;
        getOrderPrice(db, orderId).then((res) => {
          orderPrice = res.rows;
          response.render('order-confirmation', {orderItems, orderId, orderPrice, userId, isOwner})
        }).catch((err) => {
          console.log(err);
          response.status(500).send(err);
        });

      });
    } else {
      const errorMessage = null
      response.render('error-message', {userId, isOwner, errorMessage})
    }
  });


  router.post('/:orderId/confirmation', (req, response) => {
    const {userId, isOwner, userOrderId} = req.session;
    const orderId = req.params.orderId;
    const orderDescription = req.body.description
    const ownerPhone = getOwnerPhone(db, orderId);
    const setDescription = setOrderDesc(db, orderId, orderDescription)
    const orderStatus = setOrderStatus(db, orderId, 'confirmed');
    const totalItems = getTotalItems(db, orderId);
    const itemList = getOrder(db, orderId);

    Promise.all([totalItems, itemList, orderStatus, setDescription, ownerPhone]).then(values => {

      const numOfItems = values[0].rows[0].quantity_of_items;
      const orderInfo = values[1].rows;
      const ownerPhone = values[4].rows[0].owner_phone;
      const orderTime = estimateOrderTime(numOfItems, ownerPhone);
      const userName = orderInfo[0].first_name;
      const userMsg = `Hey ${userName}! Thanks for ordering from Burger Bar. ${orderTime}.`;
      const userPhone = orderInfo[0].phone;

      // DO NOT DELETE - SMS FUNCTIONALITY FOR CUSTOMER ORDER TIME
      // sendSms(userMsg, userPhone);

      const ownerMsg = renderOrderSms(orderInfo, orderId);

      // DO NOT DELETE - SMS FUNCTIONALITY FOR ORDER TO OWNER
      // sendSms(ownerMsg, ownerPhone);
      getOrderPrice(db, orderId).then((res) => {

        const orderPrice = res.rows;

        //Prevents unauthorized access to order receipts.. deletes orderId cookie upon submit
        if (isOwner || userId && orderId == userOrderId) {
          req.session.userOrderId = null;
          response.render('order-receipt', {orderInfo, numOfItems, orderPrice, orderTime, userId, isOwner});
        } else {
          const errorMessage = 1;
          response.render('error-message', {userId, isOwner, errorMessage})
        }
      }).catch((err) => {
        const errorMessage = 1;
        response.render('error-message', {userId, isOwner, errorMessage})
        response.status(500).send(err);
      });
    });
  });

  //Started writing route so owner can look back at old order receipts. Then realized how many db calls this needs.

  // router.get('/:orderId/:confirmation', (req, response) => {
  //   const {userId, isOwner} = req.session;
  //   getMenu(db).then(res => {
  //     if (userId && isOwner) {

  //     } else {
  //       const errorMessage = null;
  //       response.render("error-page", {menuItems, userId, isOwner, errorMessage});
  //     }
  //   });
  // });



  return router;
};

