import { useState } from 'react';
import '../styles/ExpenseList.css';

/**
 * Expense List Component
 */
export const ExpenseList = ({ expenses, onEdit, onDelete, loading }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses found</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="title-cell">{expense.title}</td>
              <td>
                <span className={`category-badge category-${expense.category.toLowerCase()}`}>
                  {expense.category}
                </span>
              </td>
<td
  className={`amount-cell ${
    expense.amount < 0 ? "amount-negative" : "amount-positive"
  }`}
>
  {expense.amount < 0
    ? `- ₹${Math.abs(expense.amount).toFixed(2)}`
    : `+ ₹${expense.amount.toFixed(2)}`}
</td>

              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => onEdit(expense)}
                  title="Edit"
                  disabled={loading || deletingId === expense._id}
                >
                  ✎
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDelete(expense._id)}
                  title="Delete"
                  disabled={loading || deletingId === expense._id}
                >
                  {deletingId === expense._id ? '...' : '✕'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
