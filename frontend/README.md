# Expense Tracker Frontend

React + Vite frontend for MERN Expense Tracker application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Create .env file:**

```bash
cp .env.example .env
```

3. **Configure API URL in .env:**

```
VITE_API_URL=http://localhost:5000/api
```

## Development

```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Features

✅ User Authentication (Login/Signup)
✅ Add/Edit/Delete Expenses
✅ Search Expenses
✅ Filter by Category and Month
✅ Expense Charts (Category & Monthly)
✅ Dashboard with Statistics
✅ Dark Mode Toggle
✅ Responsive Design
✅ Real-time Form Validation
✅ Toast Notifications
✅ Protected Routes

## Project Structure

```
frontend/src/
├── components/
│   ├── ProtectedRoute.jsx      # Route protection
│   ├── Header.jsx               # Navigation header
│   ├── Toast.jsx                # Notifications
│   ├── ExpenseForm.jsx           # Add/edit expense form
│   ├── ExpenseList.jsx           # Display expenses table
│   ├── Charts.jsx                # Category & monthly charts
│   ├── StatCard.jsx              # Statistics card
│   └── FilterPanel.jsx           # Search & filter panel
├── pages/
│   ├── Login.jsx                 # Login page
│   ├── Signup.jsx                # Signup page
│   └── Dashboard.jsx             # Main dashboard
├── context/
│   └── AuthContext.jsx           # Auth state management
├── hooks/
│   ├── useExpense.js             # Expense API hooks
│   ├── useCalculations.js        # Memoized calculations
│   ├── useForm.js                # Form state & validation
│   ├── useToast.js               # Toast notifications
│   └── useTheme.js               # Dark mode theme
├── services/
│   ├── api.js                    # Axios configuration
│   └── expenseService.js         # API endpoints
├── styles/
│   ├── globals.css               # Global styles
│   ├── App.css                   # App styles
│   ├── Header.css                # Header styles
│   ├── Auth.css                  # Auth pages styles
│   ├── Dashboard.css             # Dashboard styles
│   ├── ExpenseForm.css           # Form styles
│   ├── ExpenseList.css           # List styles
│   ├── Charts.css                # Chart styles
│   ├── FilterPanel.css           # Filter styles
│   ├── StatCard.css              # Card styles
│   └── Toast.css                 # Toast styles
├── App.jsx                       # Main app component
├── main.jsx                      # Entry point
└── index.html                    # HTML template
```

## React Hooks Used

- **useState** - For form and component state
- **useEffect** - For API calls and side effects
- **useRef** - For auto-focus on form inputs
- **useMemo** - For calculating total/category expenses
- **useCallback** - For optimized API functions
- **useContext** - For auth state management
- **Custom Hooks** - useFetchExpenses, useExpenseForm, useTheme, useToast

## API Integration

All API calls are handled through the `expenseService.js` file with Axios.

Token is automatically attached to requests from `localStorage`.

If token expires (401 error), user is redirected to login.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
