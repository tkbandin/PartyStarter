"use strict";

// Get dependencies
var express = require("express");

var path = require("path");

var http = require("http");

var bodyParser = require("body-parser");

var getDB = require("./server/getDB"); // Get our API routes


var api = require("./server/routes/api");

var app = express(); // Parsers for POST data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
})); // Point static path to dist

app.use(express["static"](path.join(__dirname, "dist/party2"))); // app.use(express.static(path.join(__dirname, "../public")));
// allows cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // update to match the domain you will make the request from

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.method + " " + req.originalUrl);
  next();
}); // Set our api routes

app.use("/api", api); // Catch all other routes and return the index file

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/party2/index.html"));
});
/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || "3000";
app.set("port", port);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
  return console.log("API running on localhost:".concat(port));
});
/**
 * Connect to MongoDB
 */

getDB();