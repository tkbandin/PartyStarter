const Party = require("../models/party");
// const getDB = require("./server/getDB");

const getParties = async (req, res) => {
  Party.find({}, (err, results) => {
    res.status(200).json(results);
  });
};

const putPartyGoing = async (req, res) => {
  const partyId = req.params.partyId;

  Party.findById(partyId).exec((err, party) => {
    party.going++;
    party.save();
  });
};

const deletePartyGoing = async (req, res) => {
  const partyId = req.params.partyId;

  Party.findById(partyId).exec((err, party) => {
    party.going--;
    party.save();
  });
};

module.exports = {
  getParties,
  putPartyGoing,
  deletePartyGoing,
};
