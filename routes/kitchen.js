const express = require('express');
const { getMenu } = require('../db');
const router  = express.Router();

module.exports = (db) => {

  router.get('/', (req, response) => {
    getMenu(db).then(res => {
      const menuItems = res.rows;
      response.render("menu", { menuItems });
    });
  });

  router.get('/', (req, response) => {
    getMenu(db).then(res => {

    })
    res.render("kitchen");
  });
  return router;
};
