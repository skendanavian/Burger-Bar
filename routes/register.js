const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail, register } = require('../db');



module.exports = (db) => {

  router.get('/', (req, res) => {
    res.render("register");
  });

  router.post('/', (req, response) => {
    const { firstName, lastName, email, phone, password  } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const dataMissing = Object.values(req.body).some(val => !val);
    if (dataMissing) {
      response.statusCode = 400;
      response.render("register", { error: 'Fill out the whole thing!' });
    }

    getUserWithEmail(db, email).then(res => {

      if (res !== null) {
      response.statusCode = 400;
      response.render("register", { error: 'Account already exists!' });
      } else {
      const data = {firstName, lastName, email, phone, hashedPassword};
      console.log(data);
      register(db, data).then(res => {
        console.log(res.rows);
        const { id: user_id } = res.rows[0];
        req.session.user_id = user_id;
        response.redirect('order');
      });
    }
    });



  });

  return router;
};
