# Citi Bike Map API
This is the API for my [Citi Bike Map project](https://github.com/UJKhokhar/citibike-map). You can view of live version [here](https://ujkhokhar.github.io/citibike-map/#/).

It's a simple express backend with only one `POST` endpoint at `/trips`. It accepts one request parameter, `dateAndTime`, in the form `2017-09-01T07:00:00-04:00`. The return object contains all trips for that date and time and an object containing coordinates that represent the route of the trip.

The trip data lives in MongoDB instance and was downloaded from [Citi Bike](https://s3.amazonaws.com/tripdata/index.html).

The routes are derived from the trip data using the start station of the trip and the end station with [OSRM](http://project-osrm.org/) as the engine.

### To run locally
After cloning the repo:

Run `npm install`.

Download the trip data. You can use the script I created by running `node scripts/download.js` to download the data for September 2017.

Setup a local instance of MongoDB and import the CSV into the DB by running the following command in your Mongo bin directory.

You'll need to update the Date field in every document in the collection and convert it from a string into an actual date object. You can check out the `scripts/updatedb.js` for an example of how to do so.

You'll also need to setup the OSRM engine. The reason this repo is so large is because I've included the raw OpenStreetMap dataset for New York City that I found [here](https://mapzen.com/data/metro-extracts/metro/new-york_new-york/). This process takes a while but run `npm run heroku-postbuild` to setup the routing engine. You can find out more about OSRM and node [here]( https://github.com/Project-OSRM/osrm-backend/blob/master/docs/nodejs/api.md).

Once everything is setup, run `npm run serve` to start a local server up.

If you'd like to create a production build, run `npm run build`.
