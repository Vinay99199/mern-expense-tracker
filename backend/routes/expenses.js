import express from 'express';
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getStatistics
} from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateExpense, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(verifyToken);

// Get statistics
router.get('/statistics', getStatistics);

// CRUD operations
router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', validateExpense, handleValidationErrors, createExpense);
router.put('/:id', validateExpense, handleValidationErrors, updateExpense);
router.delete('/:id', deleteExpense);

export default router;
