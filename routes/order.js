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

  //   const addProperty = function(property) {
  //     const p = property
  //     const newProperty = [p.owner_id, p.title, p.description, p.thumbnail_photo_url, p.cover_photo_url, p.cost_per_night, p.street, p.city, p.province, p.post_code, p.country, p.parking_spaces, p.number_of_bathrooms, p.number_of_bedrooms];
  //     return pool.query(`INSERT INTO properties (
  //        owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  //       VALUES (
  //       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, newProperty).then(res => {
  //       return res.rows[0];
  //     })
  //   }
  // ß
  router.post('/', (req, response) => {
    const ownerId = 1;
    // assign userId to var from cookies

    const items = req.body;
    addOrder(db, {userId: 1, ownerId: 1}).then(res => {
      const newOrderId = res.rows[0];
      console.log('this is new order', newOrderId);
      addOrderItems(db, newOrderId, items);
    }).catch((err) => return err);


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