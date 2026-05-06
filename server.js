const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/connection');

dotenv.config();

const app = express();
const contactsRoutes = require('./routes/contacts');

// Middleware
app.use(express.json());

// Routes
app.use('/contacts', contactsRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Contacts API is running' });
});

// Start server after MongoDB connection is initialized
const PORT = process.env.PORT || 3000;
db.initDb((err) => {
  if (err) {
    console.error('Failed to initialize database', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
