const express = require('express');
const router  = express.Router();
const { getMenu } = require('../db');

module.exports = (db) => {

  router.get('/', (req, response) => {
    getMenu(db).then(res => {
      const menuItems = res.rows;
      response.render("menu", { menuItems });
    });
  });
  return router;
};
