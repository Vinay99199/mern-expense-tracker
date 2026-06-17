import { useState, useRef, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import '../styles/ExpenseForm.css';

const CATEGORIES = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Other'];

/**
 * Expense Form Component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Object} props.initialData - Initial form data for editing
 * @param {Boolean} props.loading - Loading state
 */
export const ExpenseForm = ({ onSubmit, initialData = null, loading = false }) => {
  const initialValues = initialData || {
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  };

  const { values, errors, handleChange, handleSubmit, resetForm, titleRef } = useForm(
    initialValues,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter expense title"
          required
          disabled={loading}
          autoComplete="off"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
            disabled={loading}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            required
            disabled={loading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          required
          disabled={loading}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Add a note (optional)"
          rows="3"
          disabled={loading}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Expense'}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={resetForm}
          disabled={loading}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
