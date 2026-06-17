import { useMemo } from 'react';

/**
 * Calculate total expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {Number} Total amount
 */
export const useTotalExpenses = (expenses) => {
  return useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);
};

/**
 * Calculate expenses by category
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Expenses grouped by category
 */
export const useExpensesByCategory = (expenses) => {
  return useMemo(() => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
  }, [expenses]);
};

/**
 * Calculate expenses by month
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Expenses grouped by month
 */
export const useExpensesByMonth = (expenses) => {
  return useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += expense.amount;
      return acc;
    }, {});
  }, [expenses]);
};
