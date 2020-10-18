const express = require('express');
const router  = express.Router();

module.exports = (db) => {
//I added these routes here simply to view the non-index pages while editing.. Not sure where they should go long term and feel free to move them. 
router.get('/', (req, res) => {
  res.render("register");
});

router.post('/', (req, res) => {
  
});

  return router;
};