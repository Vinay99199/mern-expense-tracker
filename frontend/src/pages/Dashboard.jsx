import { useEffect, useState, useCallback } from 'react';
import { useFetchExpenses, useExpenseForm, useExpenseStatistics } from '../hooks/useExpense';
import { useTotalExpenses, useExpensesByCategory, useExpensesByMonth } from '../hooks/useCalculations';
import { Header } from '../components/Header';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { CategoryChart } from '../components/Charts';
import { MonthlyChart } from '../components/Charts';
import { FilterPanel } from '../components/FilterPanel';
import { StatCard } from '../components/StatCard';
import { useToast } from '../hooks/useToast';
import '../styles/Dashboard.css';

/**
 * Dashboard Page Component
 */
export const Dashboard = () => {
  const { expenses, loading, fetchExpenses, setExpenses } = useFetchExpenses();
  const { loading: formLoading, createExpense, updateExpense, deleteExpense } = useExpenseForm();
  const { statistics } = useExpenseStatistics();
  const { toasts, success, error } = useToast();
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({});
  const totalExpenses = useTotalExpenses(expenses);
  const expensesByCategory = useExpensesByCategory(expenses);

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (values) => {
      try {
        if (editingExpense) {
          await updateExpense(editingExpense._id, values);
          success('Expense updated successfully');
          setEditingExpense(null);
        } else {
          await createExpense(values);
          success('Expense added successfully');
        }
        await fetchExpenses(filters);
      } catch (err) {
        error(err.response?.data?.message || 'Failed to save expense');
      }
    },
    [editingExpense, createExpense, updateExpense, fetchExpenses, filters, success, error]
  );

  // Handle expense deletion
  const handleDeleteExpense = useCallback(
    async (id) => {
      try {
        await deleteExpense(id);
        success('Expense deleted successfully');
        await fetchExpenses(filters);
      } catch (err) {
        error(err.response?.data?.message || 'Failed to delete expense');
      }
    },
    [deleteExpense, fetchExpenses, filters, success, error]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    async (newFilters) => {
      setFilters(newFilters);
      await fetchExpenses(newFilters);
    },
    [fetchExpenses]
  );

  // Handle expense edit
  const handleEditExpense = useCallback((expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="dashboard">
      <Header />

      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Statistics */}
          <section className="stats-section">
            <h2>Dashboard</h2>
            <div className="stats-grid">
              <StatCard
                title="Total Expenses"
                value={`₹${totalExpenses.toFixed(2)}`}
                icon="💰"
                color="blue"
              />
              <StatCard
                title="Total Transactions"
                value={expenses.length}
                icon="📊"
                color="green"
              />
              <StatCard
                title="Categories"
                value={Object.keys(expensesByCategory).length}
                icon="📁"
                color="purple"
              />
              <StatCard
                title="Average Expense"
                value={`₹${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}`}
                icon="📈"
                color="orange"
              />
            </div>
          </section>

          {/* Charts */}
          <section className="charts-section">
            <div className="charts-row">
              {statistics?.byCategory && <CategoryChart data={statistics.byCategory} />}
              {statistics?.byMonth && <MonthlyChart data={statistics.byMonth} />}
            </div>
          </section>

          {/* Form and List */}
          <div className="dashboard-grid">
            {/* Expense Form */}
            <section className="form-section">
              <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
              <ExpenseForm
                onSubmit={handleFormSubmit}
                initialData={editingExpense}
                loading={formLoading}
              />
              {editingExpense && (
                <button
                  className="btn-cancel"
                  onClick={() => setEditingExpense(null)}
                >
                  Cancel Edit
                </button>
              )}
            </section>

            {/* Expenses List */}
            <section className="list-section">
              <h2>Recent Expenses</h2>
              <FilterPanel onFilterChange={handleFilterChange} />
              <ExpenseList
                expenses={expenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
                loading={loading || formLoading}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
