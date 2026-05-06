const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET /contacts - Get all contacts
router.get('/', contactsController.getAllContacts);

// GET /contacts/:id - Get a single contact by ID
router.get('/:id', contactsController.getContactById);

module.exports = router;
