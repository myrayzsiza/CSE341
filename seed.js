const dotenv = require('dotenv');
const db = require('./db/connection');

dotenv.config();

const sampleContacts = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    favoriteColor: 'Blue',
    birthday: '1990-02-14',
  },
  {
    firstName: 'Michael',
    lastName: 'Smith',
    email: 'michael.smith@example.com',
    favoriteColor: 'Green',
    birthday: '1988-07-22',
  },
  {
    firstName: 'Sofia',
    lastName: 'Garcia',
    email: 'sofia.garcia@example.com',
    favoriteColor: 'Red',
    birthday: '1995-11-05',
  },
  {
    firstName: 'Leo',
    lastName: 'Chen',
    email: 'leo.chen@example.com',
    favoriteColor: 'Yellow',
    birthday: '1992-03-18',
  },
  {
    firstName: 'Maya',
    lastName: 'Patel',
    email: 'maya.patel@example.com',
    favoriteColor: 'Purple',
    birthday: '1985-10-30',
  },
];

const seedContacts = async () => {
  try {
    const database = await db.initDb();
    const collection = database.collection('contacts');

    await collection.deleteMany({});
    const result = await collection.insertMany(sampleContacts);

    console.log(`${result.insertedCount} contact(s) seeded into the database.`);
  } catch (error) {
    console.error('Failed to seed contacts:', error.message || error);
    process.exit(1);
  } finally {
    await db.closeDb();
  }
};

seedContacts();
