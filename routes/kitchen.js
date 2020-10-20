const express = require('express');
const { getIncompleteOrders, completeOrder } = require('../db');
const router  = express.Router();

module.exports = (db) => {

  router.get('/', (req, response) => {

    getIncompleteOrders(db).then(res => {
      const incompleteOrderItems = res.rows;
      console.log(incompleteOrderItems);
      const orders = {};

      incompleteOrderItems.forEach(item => {
        orders[item.order_id] = {
          created_at: item.created_at,
          description: item.description,
          first_name: item.first_name,
          surname: item.surname,
          phone: item.phone,
          order_items: {}
        };
      });

      incompleteOrderItems.forEach(item => {
        const { order_id, order_item_id } = item;
        const { order_items } = orders[order_id];

        order_items[order_item_id] = {
          menu_item_name: item.menu_item_name,
          quantity: item.quantity
        };
      });

      response.render("kitchen", { orders });
    });
  });

  router.post('/:orderId', (req, response) => {
    const { orderId } = req.params;

    completeOrder(db, orderId).then(
      response.redirect('/kitchen')
    ).catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
  });

  return router;
};
