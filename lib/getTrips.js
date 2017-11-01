const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/CitibikeTrips';

export default function getTrips(dateAndTime) {
  const formattedDate = new Date(dateAndTime);
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
