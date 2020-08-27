"use strict";

var Party = require("../models/party"); // const getDB = require("./server/getDB");


var getParties = function getParties(req, res) {
  return regeneratorRuntime.async(function getParties$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Party.find({}, function (err, results) {
            res.status(200).json(results);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var putPartyGoing = function putPartyGoing(req, res) {
  var partyId;
  return regeneratorRuntime.async(function putPartyGoing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          partyId = req.params.partyId;
          Party.findById(partyId).exec(function (err, party) {
            party.going++;
            party.save();
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var deletePartyGoing = function deletePartyGoing(req, res) {
  var partyId;
  return regeneratorRuntime.async(function deletePartyGoing$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          partyId = req.params.partyId;
          Party.findById(partyId).exec(function (err, party) {
            party.going--;
            party.save();
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  getParties: getParties,
  putPartyGoing: putPartyGoing,
  deletePartyGoing: deletePartyGoing
};