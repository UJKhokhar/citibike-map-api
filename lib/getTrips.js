const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/CitibikeTrips';

export default function getTrips(date, time) {
  const formattedDate = new Date(`${date}T${time}Z`);
  return MongoClient.connect(url)
    .then((db) => {
      return db.collection('trips').find({
        starttime: { $lte: formattedDate },
        stoptime: { $gte: formattedDate },
      }).toArray()
    })
    .then((docs) => {
      return docs;
    })
    .catch((err) => {
      console.log('Error fetching trips', err);
      return err;
    });
}
