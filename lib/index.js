// import _ from 'lodash';
import getTrips from './getTrips';
import getRoute from './getRoute';

const port = process.env.PORT || 3030;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const whitelist = ['https://ujkhokhar.github.io', 'http://localhost:8080', 'http://localhost:8081'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.options('*', cors());

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

app.post('/trips', cors(corsOptions), (req, res) => {
  getTrips(req.body.dateAndTime)
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
