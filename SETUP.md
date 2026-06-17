# 🔧 Setup Instructions

Detailed step-by-step setup guide for the MERN Expense Tracker project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have the following installed:

### Required
- **Node.js** (v14 or higher)
  - Download from https://nodejs.org
  - Verify: `node --version` and `npm --version`

- **Git**
  - Download from https://git-scm.com
  - Verify: `git --version`

- **MongoDB Atlas Account** (Free)
  - Create at https://www.mongodb.com/cloud/atlas
  - No credit card required for free tier

### Optional
- **Visual Studio Code** (Recommended editor)
- **Postman** (For API testing)
- **Git Bash** (For Windows users)

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with:
   - Email
   - Password
   - Accept terms
4. Complete verification
5. Create organization (optional)

### Step 2: Create a Cluster

1. In MongoDB Atlas dashboard
2. Click "Create Deployment"
3. Choose **Free Tier** (M0)
4. Select cloud provider: **AWS** or your preference
5. Select region closest to you
6. Click "Create Deployment"
7. Wait for cluster to deploy (3-5 minutes)

### Step 3: Create Database User

1. Go to **Database Access** in left sidebar
2. Click **Add New Database User**
3. Choose "Password" authentication
4. Username: `expense_tracker_user`
5. Password: Create a strong password (save it!)
6. Database User Privileges: Select "Read and write to any database"
7. Click **Add User**

**Example:**
```
Username: expense_tracker_user
Password: SecurePassword123!@#
```

### Step 4: Get Connection String

1. Go to **Databases** in left sidebar
2. Click **Connect** on your cluster
3. Choose "Drivers"
4. Select **Node.js** and version
5. Copy the connection string
6. Replace `<username>` and `<password>` with your credentials
7. Replace `expense-tracker` if using different database name

**Example Connection String:**
```
mongodb+srv://expense_tracker_user:SecurePassword123!@#@cluster0.abc123.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

### Step 5: Whitelist IP Address

1. Go to **Network Access** in left sidebar
2. Click **Add IP Address**
3. Click **Add Current IP Address** (for your computer)
4. Or click **Allow Access from Anywhere** (0.0.0.0/0) for testing
5. Click **Confirm**

⚠️ **Security Note:** For production, only whitelist specific IPs.

## Backend Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/jaiswalvinay925-ship-it/mern-expense-tracker.git
cd mern-expense-tracker
```

### Step 2: Navigate to Backend

```bash
cd backend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- express-validator
- helmet

### Step 4: Create Environment File

```bash
cp .env.example .env
```

### Step 5: Configure Environment Variables

Open `.env` file and update:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://expense_tracker_user:SecurePassword123!@#@cluster0.abc123.mongodb.net/expense-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_make_it_very_strong_and_random_abc123!@#$%
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

**Important:**
- Replace the entire `MONGO_URI` with your connection string
- Make `JWT_SECRET` long and random (minimum 32 characters)
- Keep these credentials secret!

### Step 6: Verify Backend Setup

```bash
npm run dev
```

You should see:
```
✅ Server running on port 5000
📋 Environment: development
✅ MongoDB connected: cluster0.abc123.mongodb.net
```

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

You should get:
```json
{"status":"Server is running","timestamp":"2024-01-15T10:30:00.000Z"}
```

## Frontend Setup

### Step 1: Open New Terminal

Keep the backend running in the first terminal. Open a new terminal window.

### Step 2: Navigate to Frontend

```bash
cd mern-expense-tracker/frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- recharts
- vite

### Step 4: Create Environment File

```bash
cp .env.example .env
```

### Step 5: Configure Environment Variables

Open `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

This tells frontend where to find the backend API.

### Step 6: Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
  Local:        http://localhost:5173/
```

The browser will automatically open the application.

## Running the Application

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Output:
```
✅ Server running on port 5000
📋 Environment: development
✅ MongoDB connected: cluster0.abc123.mongodb.net
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Output:
```
Local:        http://localhost:5173/
```

### Access Application

Open browser and go to: **http://localhost:5173**

## Testing

### Test User Registration

1. Click **Sign Up** button
2. Fill in form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click **Sign Up**
4. You should be redirected to login page

### Test User Login

1. On login page, enter:
   - Email: `john@example.com`
   - Password: `password123`
2. Click **Login**
3. You should be redirected to dashboard

### Test Add Expense

1. On dashboard, fill the form:
   - Title: `Lunch at restaurant`
   - Amount: `500`
   - Category: `Food`
   - Date: `2024-01-15`
   - Description: `Lunch with friends`
2. Click **Save Expense**
3. You should see toast notification: "Expense added successfully"
4. Expense should appear in the list

### Test Search

1. In the search box, type: `lunch`
2. The list should filter to show only matching expenses

### Test Filter

1. Select Category: `Food`
2. Select Month: `January`
3. List should update
4. Click **Reset** to clear filters

### Test Edit Expense

1. Click pencil icon (✎) on any expense
2. Form should populate with expense data
3. Change title to: `Dinner at restaurant`
4. Click **Save Expense**
5. Expense should be updated

### Test Delete Expense

1. Click delete icon (✕) on any expense
2. Confirm deletion
3. Expense should be removed from list

### Test Dark Mode

1. Click moon icon (🌙) in header
2. UI should switch to dark theme
3. Click sun icon (☀️) to switch back
4. Refresh page - theme should persist

### Test Logout

1. Click **Logout** button in header
2. Confirm logout
3. You should be redirected to login page

## Project File Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   ├── User.js
│   └── Expense.js
├── routes/
│   ├── auth.js
│   └── expenses.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── vite.config.js
```

## Common Issues and Solutions

### Issue: "Cannot find module 'mongoose'"

**Solution:**
```bash
cd backend
npm install
```

### Issue: "MongoDB connection failed"

**Solutions:**
1. Verify `MONGO_URI` in `.env` is correct
2. Check IP whitelist on MongoDB Atlas
3. Verify database user credentials
4. Check internet connection
5. Ensure database cluster is running

### Issue: "Port 5000 is already in use"

**Solution:**
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=5001 npm run dev
```

### Issue: "Frontend can't connect to backend"

**Solutions:**
1. Verify backend is running
2. Check `VITE_API_URL` in frontend `.env`
3. Check browser console for errors
4. Verify CORS is enabled

### Issue: "CORS error"

**Solution:**
Update `FRONTEND_URL` in backend `.env` to match your frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

Then restart backend.

### Issue: "401 Unauthorized"

**Solutions:**
1. Login again
2. Check JWT token in localStorage
3. Verify `JWT_SECRET` hasn't changed
4. Check if token has expired

## Useful Commands

### Backend
```bash
# Start development server
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Add new package
npm install package-name
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Add new package
npm install package-name
```

## Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. ✅ Customize colors/styling
4. ✅ Add more categories if needed
5. ✅ Deploy to production (see [DEPLOYMENT.md](./DEPLOYMENT.md))

## Security Reminders

- Never commit `.env` file
- Never share `JWT_SECRET`
- Never share database password
- Use strong passwords
- Keep `node_modules` out of git (already in `.gitignore`)
- Update packages regularly

## Getting Help

If you face issues:

1. Check browser console for errors (F12)
2. Check backend terminal for error messages
3. Verify all environment variables
4. Ensure MongoDB connection is working
5. Check that both servers are running

Your MERN Expense Tracker is now set up and ready to use!

Happy tracking! 💰
