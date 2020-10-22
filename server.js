// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');


// PG database client/connection setup
const {Pool} = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

// set up cookies
const cookieSession = require('cookie-session');
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const aboutRoutes = require("./routes/about");
const kitchenRoutes = require("./routes/kitchen");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const logoutRoutes = require("./routes/logout");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/about", aboutRoutes(db));
app.use("/kitchen", kitchenRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/order", orderRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/logout", logoutRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const {userId, isOwner} = req.session;
  res.render("index", {userId, isOwner});
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
