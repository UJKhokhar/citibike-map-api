const { MongoClient } = require('mongodb');

// Add T and Z to time strings to indiciate proper time zone
function formatTime(time) {
  const timeArray = time.split(' ');
  return `${timeArray[0]}T${timeArray[1]}Z`;
}

MongoClient.connect('mongodb://localhost:27017/CitibikeTrips', (err, db) => {
  db.collection('trips').find()
    .toArray()
    .then((docs) => {
      docs.forEach((doc) => {
        const newStartTime = new Date(formatTime(doc.starttime));
        const newStopTime = new Date(formatTime(doc.stoptime));
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
    })
    .catch((err) => {
      console.log('Error fetching trips', err);
      return err;
    });


  // There is just sooo much data. Lets just eliminate everything that's 9/1/2017
  // Alternate way would be to split csv before import
  // db.collection('trips').deleteMany({
  //   starttime: { $not: /^(2017-09-01).*/ },
  // });
  // db.close();
});