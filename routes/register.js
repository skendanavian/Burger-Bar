const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {getUserWithEmail, register} = require('../db');



module.exports = (db) => {

  router.get('/', (req, res) => {
    const {userId, is_owner} = req.session;
    if (userId && is_owner) {
      res.redirect('kitchen');
    } else if (userId) {
      res.redirect('order');
    } else {
      res.render("register", userId, is_owner);
    }
  });

  router.post('/', (req, response) => {
    const {firstName, lastName, email, phone, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const dataMissing = Object.values(req.body).some(val => !val);
    if (dataMissing) {
      response.statusCode = 400;
      response.render("register", {error: 'Fill out the whole thing!'});
    }

    getUserWithEmail(db, email).then(res => {

      if (res !== null) {
        response.statusCode = 400;
        response.render("register", {error: 'Account already exists!'});
      } else {
        const data = {firstName, lastName, email, phone, hashedPassword};
        console.log(data);
        register(db, data).then(res => {
          console.log(res.rows);
          const {id: user_id, isOwner: is_owner} = res.rows[0];
          req.session.user_id = user_id;
          req.session.isOwner = userisOwner
          if (userId && isOwner) {
            res.redirect('kitchen');
          } else if (userId) {
            response.redirect('order');
          }
        });
      }
    });



  });

  return router;
};
