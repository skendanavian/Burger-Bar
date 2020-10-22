const express = require('express');
const bcrypt = require('bcrypt');
const phoneUtil = require('google-libphonenumber');
const router  = express.Router();
const { getUserWithEmail, register } = require('../db');


const validateRegisterData = (data) => {
  const { firstName, lastName, email, phone, password  } = data;
  const errorMsgs = [];

  const dataMissing = Object.values(data).some(val => !val);
  if (dataMissing) {
    errorMsgs.push('Please fill out the whole form.');
  }

  if (firstName.length > 50) {
    errorMsgs.push('First name entry has too many characters.');
  }

  if (lastName.length > 50) {
    errorMsgs.push('Last name entry has too many characters.');
  }

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = emailPattern.test(email);
  if(!isValidEmail) {
    errorMsgs.push('Please enter a valid email address.');
  }

  if (!phoneUtil.isPossibleNumber(phone)) {
    errorMsgs.push('Please enter a valid phone number.');
  }

  if(password.length < 6) {
    errorMsgs.push('Your password is too short! Please enter one at least 6 characters long.');
  }

  return errorMsgs;
}


module.exports = (db) => {

  router.get('/', (req, res) => {
    const { userId } =  req.session;
    res.render("register");
  });

  router.post('/', (req, response) => {
    const { firstName, lastName, email, phone, password  } = req.body;
    const { userId, ownerId } = req.session;

    const errorMsgs = validateRegisterData(req.body);
    if (errorMsgs.length) {
      response.statusCode = 400;
      response.render("register", { userId, ownerId, errorMsgs });
    }

    getUserWithEmail(db, email).then(res => {

      if (res !== null) {
        response.statusCode = 400;
        errorMsgs.push('User with this email already exists.')
        response.render("register", { userId, ownerId, errorMsgs });
      } else {

        const hashedPassword = bcrypt.hashSync(password, 10);
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
