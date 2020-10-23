const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {getUserWithEmail} = require('../db');


module.exports = (db) => {

  router.get('/', (req, res) => {
    const {userId, isOwner} = req.session;
    if (userId && isOwner) {
      res.redirect('kitchen');
    } else if (userId) {
      res.redirect('order')
    } else {
      res.render("login", {userId, isOwner, errorMsgs: []});
    }
  });

  /**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password encrypted
 */
  const login = function(email, password) {
    return getUserWithEmail(db, email)
      .then(user => {

        if (!user) {
          return null;
        } else if (bcrypt.compareSync(password, user.password)) {
          return user;
        } else {
          return null;
        }

      });
  }

  router.post('/', (req, response) => {
    const {email, password} = req.body;
    const {userId, isOwner} = req.session;
    const errorMsgs = [];

    if (!email || !password) {
      errorMsgs.push('Fill in the whole form!');
      response.render('login', {userId, isOwner, errorMsgs});
    }

    login(email, password)
      .then(user => {
        console.log('login page::::::', user);
        if (!user) {
          console.log('AM I HERE:::::::::::');
          errorMsgs.push('User not found!');
          console.log(userId, isOwner, errorMsgs);
          response.render('login', {userId, isOwner, errorMsgs});
          return;
        }
        console.log(user.is_owner)
        req.session.userId = user.id;
        req.session.isOwner = user.is_owner;
        const {userId, isOwner} = req.session;
        if (userId && isOwner) {
          response.redirect('kitchen');
        } if (userId) {
          response.redirect('order');
        }
      })
      .catch(e => {
        response.send(e);
        return;
      });
  });

  return router;
};


