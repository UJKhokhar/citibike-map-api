const decompress = require('decompress');
const path = require('path');

decompress(path.join(__dirname, '../tripdata.zip'), path.join(__dirname, '../tripdata'))
  .then(() => {
    console.log('done!');
  });
