"use strict";

var express = require("express");

var router = express.Router();

var partiesCtrl = require("../controllers/parties");
/* GET api listing. */


router.get("/", function (req, res) {
  res.send("api works");
});
router.route("/parties").get(partiesCtrl.getParties);
router.route("/parties/:partyId/going").put(partiesCtrl.putPartyGoing)["delete"](partiesCtrl.deletePartyGoing);
module.exports = router;