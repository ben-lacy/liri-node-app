// --------- REQUEST ------------ //
var request = require("request");

// --------- EXPRESS ------------ //
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

// --------- STATIC ROUTES ------------ //
app.use(express.static("public"));
app.use(express.static("routes"));

// --------- BODYPARSER ------------ //
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --------- ROUTES ------------ //
var path = require("path");
require(path.join(__dirname, './routes/routes.js'))(app);

// --------- PORT LISTENER ------------ //
app.listen(port, function() {
    console.log("App listening on port " + port);
});