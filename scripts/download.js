const https = require('https');
const fs = require('fs');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, '../tripdata.zip'));

https.get('https://s3.amazonaws.com/tripdata/JC-201707-citibike-tripdata.csv.zip', (response) => {
  response.pipe(file);
});
