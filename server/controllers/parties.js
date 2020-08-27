const Party = require("../models/party");
// const getDB = require("./server/getDB");

const getParties = async (req, res) => {
  Party.find({}, (err, results) => {
    console.log(results);
    res.status(200).json(results);
  });
};

module.exports = {
  getParties,
};
