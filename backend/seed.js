const dns = require('dns');
const { MongoClient } = require('mongodb');

dns.setServers(['8.8.8.8']);
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    const database = client.db('contacts');
    const collection = database.collection('contacts');

    // Clear existing data
    await collection.deleteMany({});

    // Insert new data
    const userData = require('./user.json')[0];
    await collection.insertOne(userData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();