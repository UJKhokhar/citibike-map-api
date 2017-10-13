const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('tripdata.zip');

https.get('https://s3.amazonaws.com/tripdata/JC-201707-citibike-tripdata.csv.zip', (response) => {
  response.pipe(file);
});
