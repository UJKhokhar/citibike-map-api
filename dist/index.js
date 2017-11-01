'use strict';

var _getTrips = require('./getTrips');

var _getTrips2 = _interopRequireDefault(_getTrips);

var _getRoute = require('./getRoute');

var _getRoute2 = _interopRequireDefault(_getRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import _ from 'lodash';
var port = process.env.PORT || 3030;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var whitelist = ['https://ujkhokhar.github.io', 'http://localhost:8080', 'http://localhost:8081'];

var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.options('*', cors());

app.use(bodyParser.json());

app.listen(port, function () {
  console.log('Started on port ' + port);
});

app.post('/trips', cors(corsOptions), function (req, res) {
  (0, _getTrips2.default)(req.body.dateAndTime).then(function (trips) {
    var routesPromises = trips.map(function (trip) {
      var routePromise = (0, _getRoute2.default)(trip);
      return routePromise;
    });

    return Promise.all(routesPromises);
  }).then(function (results) {
    res.send(results);
  });
});