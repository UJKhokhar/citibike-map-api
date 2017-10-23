import getTrips from './findTrip';
import getRoute from './routes';

getTrips('2017-09-01', '06:00:00')
  .then((trips) => {
    console.log('Number of trips:', trips.length);

    const routesPromises = trips
      .map(trip => {
        const coord = [
          [trip['start station longitude'], trip['start station latitude']],
          [trip['end station longitude'],trip['end station latitude']],
        ];
        const routePromise = getRoute(coord);
        return routePromise;
      });

    return Promise.all(routesPromises);
  })
  .then(results => {
    return results;
  });
