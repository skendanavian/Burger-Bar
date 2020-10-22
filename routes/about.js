const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const {userId, isOwner} = req.session;
    res.render("about", {userId, isOwner});
  });
  return router;
};