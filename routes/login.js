const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail } = require('../db');


module.exports = (db) => {

  router.get('/', (req, res) => {
    res.render("login");
  });

    /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    console.log(':::::::::::::::IN LOGIN::::')
    return getUserWithEmail(db, email)           //implement get user with email
    .then(user => {
      console.log('::::::::::: IN USER LOOKUP THEN::::', )
      console.log('HUH?',bcrypt.compareSync(password, user.password))
      if (bcrypt.compareSync(password, user.password)) {
        console.log('::::::::::: USER VALIDATES ::::')
        return user;
      }
      return null;
    });
  }
  exports.login = login;                        //what is this?

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    console.log('::::::::::::::IN ROUTE:::');
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.redirect('order');
        // res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  return router;
};
