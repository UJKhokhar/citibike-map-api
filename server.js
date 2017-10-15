import _ from 'lodash';
import getTrips from './findTrip';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3030, () => {
  console.log('Started on port 3030');
});

app.post('/', (req, res) => {
  getTrips(req.body.date, req.body.time)
    .then((trips) => {
      console.log('Trips', trips);
      res.send(trips);
    })
    .catch((err) => {
      res.send(err);
    });
});
