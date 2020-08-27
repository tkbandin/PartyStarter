"use strict";

var Party = require("../models/party"); // const getDB = require("./server/getDB");


var getParties = function getParties(req, res) {
  return regeneratorRuntime.async(function getParties$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Party.find({}, function (err, results) {
            console.log(results);
            res.status(200).json(results);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  getParties: getParties
};