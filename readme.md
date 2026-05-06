# Contacts API - Part 1

A Node.js Express API for managing contacts stored in MongoDB.

## Project Structure

```
├── server.js                 # Main Express application
├── package.json              # Project dependencies
├── .env                      # Environment variables (not in git)
├── .gitignore                # Git ignore rules
├── controllers/
│   └── contacts.js          # Contact business logic
├── routes/
│   └── contacts.js          # Contact API endpoints
└── db/
    └── connection.js        # MongoDB connection handler
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/contacts?retryWrites=true&w=majority
PORT=3000
```

### 3. Run the Application
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### GET /contacts
Returns all contacts from the database.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
]
```

### GET /contacts/:id
Returns a single contact by MongoDB ID.

**Parameters:**
- `id` (string): MongoDB ObjectId

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "123-456-7890"
}
```

**Error Responses:**
- `400`: Invalid contact ID format
- `404`: Contact not found
- `500`: Server error

## Security Features

- ✅ MongoDB URI stored in `.env` file
- ✅ `.env` and `node_modules` excluded via `.gitignore`
- ✅ No hardcoded credentials in code
- ✅ Environment variables for configuration

## Deployment to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 3000 (or desired port)
4. Deploy

The application is ready for Render deployment with no hardcoded credentials.

## Architecture

**MVC Pattern:**
- **Models**: MongoDB collections (contacts)
- **Views**: JSON API responses
- **Controllers**: `controllers/contacts.js` - business logic
- **Routes**: `routes/contacts.js` - endpoint definitions
- **Server**: `server.js` - application entry point
- **Database**: `db/connection.js` - MongoDB connection management

## Technologies

- Express.js 4.18.2
- MongoDB 5.1.0
- Node.js with dotenv for configuration
