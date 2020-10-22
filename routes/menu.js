const express = require('express');
const router = express.Router();
const {getMenu} = require('../db');

module.exports = (db) => {

  router.get('/', (req, response) => {
    const {userId, isOwner} = req.session;
    getMenu(db).then(res => {
      const menuItems = res.rows;
      response.render("menu", {menuItems, userId, isOwner});
    });
  });

  return router;
};
