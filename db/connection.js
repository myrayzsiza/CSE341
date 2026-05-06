const { MongoClient } = require('mongodb');

let db;
let client;

const initDb = async () => {
  if (db) {
    return db;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();
  db = client.db(process.env.MONGODB_DB || 'contacts');
  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error('Db not initialized');
  }
  return db;
};

const closeDb = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

const getClient = () => {
  if (!client) {
    throw new Error('MongoClient has not been connected');
  }
  return client;
};

module.exports = {
  initDb,
  getDb,
  getClient,
  closeDb,
};
