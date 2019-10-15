// dependencies
var express = require("express");
var hbs = require("express-handlebars");

// hosting properties
var PORT = process.env.PORT || 3377; // D E R P! :D

// create host variable
var app = express();

// set dir path for assets
app.use(express.static("public"));

// parse config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebar/views config
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import cake routes
require("./routes/apiRoutes.js")(app);

// require db
var db = require("./models");

// start connection
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Hosting on PORT " + PORT)
  })
})