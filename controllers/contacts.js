const { ObjectId } = require('mongodb');
const db = require('../db/connection');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.findOne({ _id: id });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message.includes('invalid hex string')) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
