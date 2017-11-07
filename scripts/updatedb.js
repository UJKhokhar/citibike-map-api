const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/CitibikeTrips', (err, db) => {
  db.collection('trips').find({
    starttime: /^2017-09-07.*/,
  })
    .toArray()
    .then((docs) => {
      docs.forEach((doc) => {
        const newStartTime = new Date((doc.starttime));
        const newStopTime = new Date((doc.stoptime));
        db.collection('trips').update(
          { _id: doc._id },
          {
            $set: {
              starttime: newStartTime,
              stoptime: newStopTime,
            }
          }
        )
      });
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
