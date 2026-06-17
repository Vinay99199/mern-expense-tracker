# Expense Tracker Backend

Node.js + Express + MongoDB backend for MERN Expense Tracker application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. **Install dependencies:**

```bash
cd backend
npm install
```

2. **Create .env file:**

```bash
cp .env.example .env
```

3. **Update .env with your MongoDB credentials:**

```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Create a database user with password
5. Get your connection string
6. Add connection string to .env file

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Expenses

- `GET /api/expenses` - Get all expenses (protected)
- `GET /api/expenses/:id` - Get single expense (protected)
- `POST /api/expenses` - Create expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)
- `GET /api/expenses/statistics` - Get expense statistics (protected)

## Authentication

All protected routes require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Auth logic
│   └── expenseController.js # Expense logic
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── errorHandler.js    # Error handling
│   └── validation.js      # Input validation
├── models/
│   ├── User.js            # User schema
│   └── Expense.js         # Expense schema
├── routes/
│   ├── auth.js            # Auth routes
│   └── expenses.js        # Expense routes
├── .env.example           # Environment variables example
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main server file
```

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time (e.g., 7d)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Features

✅ User authentication with JWT
✅ Password hashing with bcryptjs
✅ MongoDB Atlas integration
✅ Expense CRUD operations
✅ Expense filtering and search
✅ Expense statistics and analytics
✅ Input validation
✅ Error handling
✅ CORS support
✅ Security headers with Helmet

## Deployment

### Deploy to Render:

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

### Deploy to Railway:

1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub
4. Add MongoDB Atlas URI
5. Deploy

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // validation errors if any
}
```

## Testing

You can test the API using:

- Postman
- Thunder Client
- VS Code REST Client
- curl

## License

MIT
