const express = require('express');
const bcrypt = require('bcrypt');
const {parsePhoneNumber} = require('libphonenumber-js/min');
const router = express.Router();
const {getUserWithEmail, register} = require('../db');


const validateRegisterData = (data) => {
  const {firstName, lastName, email, phone, password} = data;
  const errorMsgs = [];

  const dataMissing = Object.values(data).some(val => !val);
  if (dataMissing) {
    errorMsgs.push('Please fill out the whole form.');
  }

  if (firstName && firstName.length > 50) {
    errorMsgs.push('First name entry has too many characters.');
  }

  if (lastName && lastName.length > 50) {
    errorMsgs.push('Last name entry has too many characters.');
  }

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = emailPattern.test(email);
  if (email && !isValidEmail) {
    errorMsgs.push('Please enter a valid email address.');
  }

  // phone library is being weird, a one digit number throws an error during parsing
  // the catch block is only for when an error occurs during parsing
  // the phone wouldn't be valid anyway
  try {
    const parsedPhone = parsePhoneNumber(phone, 'CA');
    if (!parsedPhone.isValid()) {
      errorMsgs.push('Please enter a valid phone number with area code.');
    }
  } catch {
    if (phone) {
      errorMsgs.push('Please enter a valid phone number with area code.');
    }
  }

  if (password && password.length < 6) {
    errorMsgs.push('Your password is too short! Please enter one at least 6 characters long.');
  }

  return errorMsgs;
}


module.exports = (db) => {

  router.get('/', (req, res) => {
    const {userId, isOwner} = req.session;
    if (userId && isOwner) {
      res.redirect('kitchen');
    } else if (userId) {
      res.redirect('order');
    } else {
      res.render("register", {userId, isOwner, errorMsgs: []});
    }
  });

  router.post('/', (req, response) => {
    const {firstName, lastName, email, phone, password} = req.body;
    const {userId, isOwner} = req.session;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const errorMsgs = validateRegisterData(req.body);
    if (errorMsgs.length) {
      response.statusCode = 400;
      response.render("register", {userId, isOwner, errorMsgs});
    }

    getUserWithEmail(db, email).then(res => {

      if (res !== null) {
        response.statusCode = 400;
        errorMsgs.push('User with this email already exists. Please try another.')
        response.render("register", {userId, isOwner, errorMsgs});
      } else {

        const formattedPhone = parsePhoneNumber(phone, 'CA').number;
        const data = {
          firstName,
          lastName,
          email,
          phone: formattedPhone,
          hashedPassword
        };
        register(db, data).then(res => {
          const {user_id, is_owner} = res.rows[0];
          req.session.userId = user_id;
          req.session.isOwner = is_owner;

          if (user_id && is_owner) {
            res.redirect('kitchen');
          } else if (user_id) {
            response.redirect('order');
          }
        });
      }
    });



  });

  return router;
};
