const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
const path = require('path');

dotenv.config();

const app = express();
const contactsRoutes = require('./routes/contacts');
const professionalRoutes = require('./backend/routes/professional');

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve index.html for the root (frontend)
app.get('/', (req, res) => {
  // Redirect root to Swagger UI so you can interact with the API in production
  res.redirect('/api-docs');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start server after MongoDB connection is initialized
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.initDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Node env: ${process.env.NODE_ENV || 'not set'}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error.message || error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
