const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    req.session = null;
    const userId = req.session;
    res.redirect('/');
  });

  router.post('/', (req, res) => {

  });

  return router;
};