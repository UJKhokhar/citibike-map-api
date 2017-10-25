'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTrips;

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var url = 'mongodb://localhost:27017/CitibikeTrips';

function getTrips(date, time) {
  var formattedDate = new Date(date + 'T' + time + 'Z');
  return MongoClient.connect(url).then(function (db) {
    return db.collection('trips').find({
      starttime: { $lte: formattedDate },
      stoptime: { $gte: formattedDate }
    }).toArray();
  }).then(function (docs) {
    return docs;
  }).catch(function (err) {
    console.log('Error fetching trips', err);
    return err;
  });
}