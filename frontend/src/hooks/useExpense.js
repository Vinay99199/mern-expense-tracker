import { useState, useCallback } from 'react';
import { expenseAPI } from '../services/expenseService';

/**
 * Custom hook for fetching expenses
 */
export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.getExpenses(filters);
      setExpenses(response.data.expenses);
      return response.data.expenses;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch expenses';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { expenses, loading, error, fetchExpenses, setExpenses };
};

/**
 * Custom hook for creating/updating expense
 */
export const useExpenseForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createExpense = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.createExpense(data);
      return response.data.expense;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create expense';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExpense = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.updateExpense(id, data);
      return response.data.expense;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update expense';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await expenseAPI.deleteExpense(id);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete expense';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, createExpense, updateExpense, deleteExpense };
};

/**
 * Custom hook for fetching statistics
 */
export const useExpenseStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.getStatistics(params);
      setStatistics(response.data.statistics);
      return response.data.statistics;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch statistics';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { statistics, loading, error, fetchStatistics };
};
