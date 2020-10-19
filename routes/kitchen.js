const express = require('express');
const { getIncompleteOrders } = require('../db');
const router  = express.Router();

module.exports = (db) => {

  // router.get('/', (req, response) => {
  //   getMenu(db).then(res => {
  //     const menuItems = res.rows;
  //     response.render("menu", { menuItems });
  //   });
  // });

  router.get('/', (req, response) => {
    getIncompleteOrders(db).then(res => {
      const orders = res.rows;
      console.log(orders);
      res.render("kitchen", { orders });
    })
  });
  return router;
};
