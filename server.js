import _ from 'lodash';
import moment from 'moment';
import tripdata from './tripdata/tripdata.json';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

function getTrips(date, time) {
  return _.filter(tripdata, trip => (
    moment(trip.starttime).isSame(date, 'day') &&
    moment(trip.starttime).isSameOrBefore(`${date} ${time}`) &&
    moment(trip.stoptime).isSameOrAfter(`${date} ${time}`)
  ));
}

app.listen(3030, () => {
  console.log('Started on port 3030');
});

app.post('/', (req, res) => {
  const trips = getTrips(req.body.date, req.body.time);
  console.log(trips);
  res.send(trips);
});
