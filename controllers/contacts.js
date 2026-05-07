const { ObjectId } = require('mongodb');
const db = require('../db/connection');

const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

const validateContactPayload = (payload) => {
  if (!payload || typeof payload !== 'object') return false;
  return requiredFields.every((field) => typeof payload[field] === 'string' && payload[field].trim().length > 0);
};

const normalizeContactPayload = (payload) => ({
  firstName: payload.firstName.trim(),
  lastName: payload.lastName.trim(),
  email: payload.email.trim(),
  favoriteColor: payload.favoriteColor.trim(),
  birthday: payload.birthday.trim(),
});

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
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    if (!validateContactPayload(req.body)) {
      return res.status(400).json({ message: 'Missing or invalid contact fields' });
    }

    const newContact = normalizeContactPayload(req.body);
    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.insertOne(newContact);

    res.status(201).json({ _id: result.insertedId, ...newContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const updateFields = {};
    requiredFields.forEach((field) => {
      if (typeof req.body[field] === 'string' && req.body[field].trim().length > 0) {
        updateFields[field] = req.body[field].trim();
      }
    });

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const database = db.getDb();
    const collection = database.collection('contacts');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
