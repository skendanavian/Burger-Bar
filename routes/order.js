const express = require('express');
const router = express.Router();
const {sendSms} = require('../api/index');
const {getMenu, addOrder, addOrderItems} = require('../db');


module.exports = (db) => {

  router.get('/', (req, response) => {
    getMenu(db).then(res => {
      //mentor note - implement ejs to handle errors, null data etc
      const menuItems = res.rows;
      response.render("order", {menuItems});
    });



  });

  router.post('/', (req, response) => {
    let items = req.body;
    addOrderItems(items).then(res => {res.render("/")});
    // console.log(req.body);

    // insert order into db

    //Send Order Info to Restaurant 
    // console.log(sendSms('Order Info', '+16479861087'));

    //calculate order time and send to customer 
    // console.log(sendSms('Order Info', 'customerNumber'));


    // insert order into db
    // add order to kitchen runner page
    // add btn to kitchen runner which marks order as complete or not
    // DB helper - calculate time for order
    // Message customer the estimated time
    // send 
    // sendmessage - order
    //kitchen runner page - complete order. -- 

  });


  return router;
};