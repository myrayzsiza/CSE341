const dotenv = require('dotenv');
const db = require('./db/connection');

dotenv.config();

const sampleContacts = [
  {
    firstName: 'Amina',
    lastName: 'Okafor',
    email: 'amina.okafor@example.com',
    favoriteColor: 'Teal',
    birthday: '1993-05-11',
  },
  {
    firstName: 'Diego',
    lastName: 'Martinez',
    email: 'diego.martinez@example.com',
    favoriteColor: 'Maroon',
    birthday: '1987-08-23',
  },
  {
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@example.com',
    favoriteColor: 'Coral',
    birthday: '1991-12-09',
  },
  {
    firstName: 'Jamal',
    lastName: 'Brown',
    email: 'jamal.brown@example.com',
    favoriteColor: 'Navy',
    birthday: '1985-03-30',
  },
  {
    firstName: 'Lucia',
    lastName: 'Moretti',
    email: 'lucia.moretti@example.com',
    favoriteColor: 'Mint',
    birthday: '1996-07-19',
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
