const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }

  MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) {
      return callback(err);
    }

    db = client.db('contacts');
    callback(null, db);
  });
};

const getDb = () => {
  if (!db) {
    throw Error('Db not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb,
};
