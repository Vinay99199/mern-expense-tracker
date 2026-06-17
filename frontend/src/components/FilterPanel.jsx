import { useState } from 'react';
import '../styles/FilterPanel.css';

const CATEGORIES = ['All', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Other'];

/**
 * Filter Panel Component
 */
export const FilterPanel = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange?.({ category: category === 'All' ? null : category });
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    if (month) {
      onFilterChange?.({ month: parseInt(month), year: selectedYear });
    } else {
      onFilterChange?.({ month: null, year: null });
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    if (selectedMonth) {
      onFilterChange?.({ month: parseInt(selectedMonth), year: parseInt(year) });
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedMonth('');
    setSelectedYear(new Date().getFullYear());
    onFilterChange?.({ category: null, month: null, year: null });
    onSearch?.('');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="filter-input"
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="month-select">Month</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="filter-select"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year-select">Year</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="filter-select"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
