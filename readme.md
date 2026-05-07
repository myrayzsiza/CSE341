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

### 2. Create a MongoDB Atlas Cluster
1. Sign in to MongoDB Atlas.
2. Create a free cluster (M0) if you do not already have one.
3. Create a database user in Atlas under `Database Access`.
4. Add your IP address or allow access from anywhere in `Network Access`.
5. Under `Clusters`, click `Connect` → `Connect your application`.
6. Copy the connection string and replace the placeholders.

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following values:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/contacts?retryWrites=true&w=majority
PORT=3000
MONGODB_DB=contacts
```

### 4. Seed the Database
```bash
npm run seed
```

### 5. Run the Application
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### 6. Verify the Database
1. In Atlas, go to `Collections`.
2. Open the `contacts` database.
3. Confirm the `contacts` collection contains at least 3 documents.

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
    "favoriteColor": "Blue",
    "birthday": "1990-05-10"
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
  "favoriteColor": "Blue",
  "birthday": "1990-05-10"
}
```

### POST /contacts
Creates a new contact.

**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@example.com",
  "favoriteColor": "Blue",
  "birthday": "1990-02-14"
}
```

### PUT /contacts/:id
Updates an existing contact.

**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.updated@example.com",
  "favoriteColor": "Green",
  "birthday": "1990-02-14"
}
```

### DELETE /contacts/:id
Deletes a contact by ID.

## API Documentation

Swagger docs are available at `/api-docs` after the server starts.

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
   - `MONGODB_DB`: contacts (optional, defaults to `contacts`)
4. Ensure Render uses `npm install && npm run build` as the build command and `npm start` as the start command.
5. Deploy

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
