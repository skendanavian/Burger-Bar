const express = require('express');
const { getIncompleteOrders } = require('../db');
const router  = express.Router();

module.exports = (db) => {

  router.get('/', (req, response) => {
    getIncompleteOrders(db).then(res => {
      const order_items = res.rows;
      console.log(order_items);
      response.render("kitchen", { orders });
    })
  });
  return router;
};
