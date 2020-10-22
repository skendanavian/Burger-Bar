const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {getUserWithEmail} = require('../db');


module.exports = (db) => {

  router.get('/', (req, res) => {
    res.render("login");
  });

  /**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password encrypted
 */
  const login = function(email, password) {
    return getUserWithEmail(db, email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  }

  router.post('/', (req, res) => {
    const {login: loginData} = req.body;
    const email = loginData[0];
    const password = loginData[1];

    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.redirect('order');
      })
      .catch(e => res.send(e));
  });

  return router;
};


