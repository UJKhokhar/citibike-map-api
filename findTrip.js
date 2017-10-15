const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/CitibikeTrips';

export default function getTrips(date, time) {
  return MongoClient.connect(url)
    .then((db) => {
      return db.collection('trips').find({
        starttime: { $lte: new Date(`${date} ${time}`) },
        stoptime: { $gte: new Date(`${date} ${time}`) },
      }).toArray()
    })
    .then((docs) => {
      console.log('Docs', docs);
      return docs;
    })
    .catch((err) => {
      console.log('Error fetching trips', err);
      return err;
    });
}
