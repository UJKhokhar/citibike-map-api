'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRoute;
var OSRM = require('osrm');

var osrmConnect = new OSRM('./nyc_data/nyc_data.osrm');

function getRoute(trip) {
  return new Promise(function (resolve, reject) {
    osrmConnect.route({
      coordinates: [[trip['start station longitude'], trip['start station latitude']], [trip['end station longitude'], trip['end station latitude']]],
      geometries: 'geojson'
    }, function (err, result) {
      if (err) {
        return reject(err);
      }

      resolve({
        trip: trip,
        coords: result.routes[0].geometry.coordinates
      });
    });
  });
}