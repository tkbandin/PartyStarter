"use strict";

var express = require("express");

var router = express.Router();
/* GET api listing. */

router.get("/", function (req, res) {
  res.send("api works");
});
module.exports = router;