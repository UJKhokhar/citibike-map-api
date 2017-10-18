// import _ from 'lodash';
import getTrips from './findTrip';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.options('*', cors());

app.use(bodyParser.json());


app.listen(3030, () => {
  console.log('Started on port 3030');
});

app.post('/trips', cors(corsOptions), (req, res) => {
  getTrips(req.body.date, req.body.time)
    .then((trips) => {
      res.send(trips);
    })
    .catch((err) => {
      res.send(err);
    });
});
