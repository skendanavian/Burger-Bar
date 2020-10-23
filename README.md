Burger Bar
=======
## Introduction

Burger bar is a webapp for Lighthouse Labs developed by Daniel Pletzke and Soren Nissen. The project functions as the midterm for the program bringing together the concepts learned so far of front-end, back-end and database management.

## Functionality

Customers can view a menu, login and order food. The customer will then be texted an estimated time for pickup and the restaurant owner will be notified via text of the new order. The kitchen staff will then receive a display of the new order on a kitchen runner page which displays the current orders, orders just received and orders ready for pickup. Once the food is ready the kitchen staff will update the order on the webapp which will then notify the user that their food is ready. Once the user has paid, the restaurant staff will then complete the order on the webapp which will maintain it in the database for record keeping.

## Development Details

The core of Burger Bar is built with the Node, Express and PostgreSQL. The templating engine is EJS. Further functionality is extended with the Twilio texting API. Various Node packages are utilized for user authentication and security including cookie-session and bcrypt. Phone number input is parsed and validated with a [fork](https://github.com/catamphetamine/libphonenumber-js/) of [google/libphonenumber](https://github.com/google/libphonenumber), minimized and written in javascript.


## Project Photos
---
<p align='center'>Home</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/HomePage.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/HomeResponsive.png?raw=true" height="300">
</p>

---
<p align='center'>Menu</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/MenuPage.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/MenuResponsive.png?raw=true" height="300">
</p>

---
<p align='center'>Login</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/Login.png?raw=true" height="300">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/LoginResponsive.png?raw=true" height="300">
</p>

---
<p align='center'>Kitchen</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/Kitchen.png?raw=true" height="400">
</p>

---
<p align='center'>Orders</p>
<p align="center">
<img src="https://github.com/skendanavian/lighthouse_midterm/blob/master/docs/OrderPage.png?raw=true" height="400">
</p>


---
## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Follow [this Quickstart guide](https://www.twilio.com/docs/sms/quickstart/node) for setting up a Twilio trial account. You'll need to add some fields into your `.env` file.
4. Run the following commands with your information from twilio.
```bash
echo "TWILIO_ACCOUNT_SID='<your information>'" >> .env
echo "TWILIO_AUTH_TOKEN='<your token>'" >> .env
echo "TWILIO_PHONE_NUMBER='<your twilio phone number>'" >> .env
```

4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
7. Run the server: `npm run local`
    - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above   
- NPM 5.x or above
- PG 6.x
- bcrypt 5.x or above
- body-parser 1.19.x or above
- chalk 2.4.x or above
- cookie-session 1.4.x or above
- date-and-time 0.14 or above
- dotenv 2.x or above 
- ejs 2.6.x or above
- express 4.17.x or above
- libphonenumber-js 1.8.x or above
- morgan 1.9.x or above
- node-sass-middleware 0.11.x or above
- pg6.4.2 6.4.x or above
- pg-native 3.x or above
- twilio 3.50.x or above
