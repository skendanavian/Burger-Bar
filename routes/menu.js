const express = require('express');
const router  = express.Router();
const { getMenu } = require('../db');

module.exports = (db) => {

  router.get('/', (req, response) => {
    getMenu(db).then(res => {
      response.render("menu");
    });
  });
  return router;
};
