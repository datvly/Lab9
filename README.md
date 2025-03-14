# Puppy Management System

A full-stack web application for managing puppies with a React frontend and Express backend using MySQL and Prisma ORM.

## Project Structure

```
Lab9/
├── backend/               # Express server
│   ├── node_modules/
│   ├── prisma/            # Prisma ORM configuration
│   │   └── schema.prisma
│   ├── .env               # Environment variables
│   ├── package.json
│   └── server.js          # Server configuration
│
└── frontend/              # React app created with Vite
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── App.jsx        # Main React component
    │   ├── App.css        # Styling
    │   └── ...
    ├── index.html
    └── package.json
```

## Running the Application

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```

The backend server will run on http://localhost:5001.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:5173 (or the port assigned by Vite).

## API Endpoints

- `GET /api/puppies` - Get all puppies
- `GET /api/puppies/:id` - Get a specific puppy by ID
- `POST /api/puppies` - Create a new puppy
- `PUT /api/puppies/:id` - Update a puppy
- `DELETE /api/puppies/:id` - Delete a puppy

## Features

- View all puppies in a table
- Add new puppies
- Update existing puppies
- Delete puppies
- Form validation 