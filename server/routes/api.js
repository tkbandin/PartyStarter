const express = require("express");
const router = express.Router();
const partiesCtrl = require("../controllers/parties");

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.route("/parties").get(partiesCtrl.getParties);
router
  .route("/parties/:partyId/going")
  .put(partiesCtrl.putPartyGoing)
  .delete(partiesCtrl.deletePartyGoing);

module.exports = router;
