// import _ from 'lodash';
import getTrips from './getTrips';
import getRoute from './getRoute';

const port = process.env.PORT || 3030;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.options('*', cors());

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

app.post('/trips', cors(corsOptions), (req, res) => {
  getTrips(req.body.date, req.body.time)
    .then((trips) => {
      const routesPromises = trips
        .map(trip => {
          const routePromise = getRoute(trip);
          return routePromise;
        });

      return Promise.all(routesPromises);
    })
    .then(results => {
      res.send(results);
    });
});
