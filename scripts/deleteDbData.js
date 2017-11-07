const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/CitibikeTrips', (err, db) => {
  db.collection('trips').deleteMany({
    starttime: { $not: /^2017-09-0[1-7].*/ },
  })
    .then(() => {
      db.close();
      console.log('Done');
    })
    .catch((err) => {
      console.log('Error fetching trips', err);
      return err;
    });
});
