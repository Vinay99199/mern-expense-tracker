# 💰 MERN Expense Tracker

A complete production-ready full-stack expense tracking application built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 🎯 Features

✅ **User Authentication**
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes
- Auto-logout on token expiry

✅ **Expense Management**
- Add, edit, delete expenses
- Search expenses by title
- Filter by category and date
- 8 predefined categories
- Expense descriptions

✅ **Analytics & Charts**
- Pie chart for expenses by category
- Bar chart for monthly spending
- Statistics dashboard
- Total, count, and average calculations

✅ **User Interface**
- Modern, responsive design
- Dark mode toggle
- Toast notifications
- Real-time form validation
- Mobile-friendly layout

✅ **React Hooks**
- useState for state management
- useEffect for side effects
- useRef for auto-focus
- useMemo for optimized calculations
- useCallback for optimized functions
- useContext for auth state
- Custom hooks for API calls

## 📋 Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/jaiswalvinay925-ship-it/mern-expense-tracker.git
cd mern-expense-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Update `.env` with your MongoDB credentials:**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_here_make_it_strong
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Start backend:**

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

**Update `.env` with backend URL:**

```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend:**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
mern-expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── expenseController.js  # Expense logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── errorHandler.js       # Error handling
│   │   └── validation.js         # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Expense.js            # Expense schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── expenses.js           # Expense routes
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                 # Main server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── FilterPanel.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useExpense.js
│   │   │   ├── useCalculations.js
│   │   │   ├── useForm.js
│   │   │   ├── useToast.js
│   │   │   └── useTheme.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── expenseService.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── App.css
│   │   │   ├── Header.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── ExpenseForm.css
│   │   │   ├── ExpenseList.css
│   │   │   ├── Charts.css
│   │   │   ├── FilterPanel.css
│   │   │   ├── StatCard.css
│   │   │   └── Toast.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
├── README.md                     # This file
├── DEPLOYMENT.md                 # Deployment guide
└── SETUP.md                      # Setup instructions
```

## 🔐 API Endpoints

### Authentication

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/profile         # Get user profile (protected)
```

### Expenses

```
GET    /api/expenses             # Get all expenses (protected)
GET    /api/expenses/:id         # Get single expense (protected)
POST   /api/expenses             # Create expense (protected)
PUT    /api/expenses/:id         # Update expense (protected)
DELETE /api/expenses/:id         # Delete expense (protected)
GET    /api/expenses/statistics  # Get statistics (protected)
```

## 🎨 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Recharts** - Charts library
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 🔑 Key React Hooks

### Built-in Hooks
- **useState** - Manage component state
- **useEffect** - Handle side effects and API calls
- **useRef** - Reference DOM elements
- **useMemo** - Optimize expensive calculations
- **useCallback** - Optimize function references
- **useContext** - Access auth context

### Custom Hooks
- **useAuth** - Authentication management
- **useFetchExpenses** - Fetch expenses from API
- **useExpenseForm** - Handle expense CRUD operations
- **useExpenseStatistics** - Fetch expense statistics
- **useTotalExpenses** - Calculate total with useMemo
- **useExpensesByCategory** - Group by category with useMemo
- **useExpensesByMonth** - Group by month with useMemo
- **useForm** - Generic form state management
- **useToast** - Toast notifications
- **useTheme** - Dark mode management

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model

```javascript
{
  userId: ObjectId (required),
  title: String (required),
  amount: Number (required),
  category: String (enum, required),
  date: Date (required),
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

✅ JWT-based authentication
✅ Password hashing with bcryptjs (10 rounds)
✅ Input validation with express-validator
✅ CORS protection
✅ Helmet for security headers
✅ Protected API routes
✅ Auto-logout on token expiry
✅ Secure localStorage for tokens

## 📱 Responsive Design

- Mobile First Approach
- Breakpoints:
  - Mobile: < 480px
  - Tablet: 481px - 768px
  - Desktop: > 769px
- Touch-friendly buttons
- Optimized for all screen sizes

## 🌙 Dark Mode

- Toggle button in header
- Persisted in localStorage
- Smooth transitions
- All components support both themes

## 📈 Expense Categories

1. Food
2. Transportation
3. Entertainment
4. Utilities
5. Healthcare
6. Shopping
7. Education
8. Other

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Render.com (Backend)
- Railway.app (Backend)
- Vercel (Frontend)
- Netlify (Frontend)

## 🛠️ Setup Instructions

See [SETUP.md](./SETUP.md) for detailed MongoDB Atlas setup and other configurations.

## 📝 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Register a new account**
   - Go to http://localhost:5173/signup
   - Fill in the form and create account

2. **Login**
   - Go to http://localhost:5173/login
   - Use your credentials

3. **Add Expenses**
   - Click "Add New Expense"
   - Fill in the form
   - Click "Save Expense"

4. **View Dashboard**
   - See statistics cards
   - View charts by category and month
   - See expense list

5. **Search & Filter**
   - Use search to find expenses
   - Filter by category
   - Filter by month and year

6. **Edit/Delete**
   - Click edit icon to modify expense
   - Click delete icon to remove expense

7. **Toggle Theme**
   - Click moon/sun icon in header
   - Theme persists on reload

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built with ❤️ for internship and learning purposes.

## 📞 Support

If you face any issues:

1. Check the backend logs in terminal
2. Check the browser console for errors
3. Verify .env files are correctly set
4. Ensure MongoDB connection is working
5. Check if ports 5000 and 5173 are available

## 🎓 Learning Points

This project demonstrates:

✅ Full-stack web development
✅ React hooks and context API
✅ RESTful API design
✅ MongoDB and Mongoose
✅ JWT authentication
✅ Form handling and validation
✅ Error handling
✅ Responsive web design
✅ State management
✅ API integration
✅ Dark mode implementation
✅ Toast notifications
✅ Chart integration
✅ Protected routes
✅ Deployment best practices

## 🎉 Ready to Use!

Your MERN Expense Tracker is now ready for development and deployment!

Happy coding! 🚀
