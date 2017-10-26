const OSRM = require('osrm');

const osrmConnect = new OSRM('./nyc_data/nyc_data.osrm');

export default function getRoute(trip) {
  return new Promise((resolve, reject) => {
    osrmConnect.route({
      coordinates: [
        [trip['start station longitude'], trip['start station latitude']],
        [trip['end station longitude'], trip['end station latitude']],
      ],
      geometries: 'geojson',
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
