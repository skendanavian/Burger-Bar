const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { getUserWithEmail, register } = require('../db');

const validatePhone = (phone) => {

}





module.exports = (db) => {

  router.get('/', (req, res) => {
    const { userId } =  req.session;
    res.render("register");
  });

  router.post('/', (req, response) => {
    const { firstName, lastName, email, phone, password  } = req.body;
    const { userId } = req.session;
    const errorMsgs = [];

    const hashedPassword = bcrypt.hashSync(password, 10);

    const dataMissing = data.some(val => !val);
    if (dataMissing) {
      response.statusCode = 400;
    }


    if () { //firstName, lastName under 50 characters,

    }

    if ()
    response.render("register", { error: 'Fill out the whole thing!' });

    getUserWithEmail(db, email).then(res => {

      if (res !== null) {
      response.statusCode = 400;
      response.render("register", { error: 'Account already exists!' });
      } else {
      const data = {firstName, lastName, email, phone, hashedPassword};
      register(db, data).then(res => {
        const { id: user_id } = res.rows[0];
        req.session.user_id = user_id;
        response.redirect('order');
      });
    }
    });



  });

  return router;
};
