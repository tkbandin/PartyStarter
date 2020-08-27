"use strict";

var express = require("express");

var router = express.Router();

var partiesCtrl = require("../controllers/parties");
/* GET api listing. */


router.get("/", function (req, res) {
  res.send("api works");
});
router.route("/parties").get(partiesCtrl.getParties);
module.exports = router;