const express = require("express");
const router = express.Router();
const partiesCtrl = require("../controllers/parties");

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.route("/parties").get(partiesCtrl.getParties);

module.exports = router;
