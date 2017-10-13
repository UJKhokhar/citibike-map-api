const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const tripData = [];

csv()
  .fromFile(path.join(__dirname, '../tripdata/JC-201707-citibike-tripdata.csv'))
  .on('json', (json) => {
    tripData.push(json);
  })
  .on('done', () => {
    fs.writeFile(path.join(__dirname, '../tripdata/tripdata.json'), JSON.stringify(tripData), (err) => {
      if (err) {
        return console.log(err);
      }

      return console.log('The file was saved!');
    });
  });
