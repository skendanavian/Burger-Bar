const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    //Delete User Cookie
    res.redirect('/');
  });

  router.post('/', (req, res) => {

  });

  return router;
};