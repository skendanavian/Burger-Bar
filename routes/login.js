const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

router.get('/', (req, res) => {
  res.render("login");
});

router.post('/', (req, res) => {

});

  return router;
};
