import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Charts.css';

const COLORS = {
  Food: '#FF6B6B',
  Transportation: '#4ECDC4',
  Entertainment: '#45B7D1',
  Utilities: '#FFA07A',
  Healthcare: '#98D8C8',
  Shopping: '#F7DC6F',
  Education: '#BB8FCE',
  Other: '#85C1E2'
};

/**
 * Category Chart Component
 */
export const CategoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="empty-chart">No data available</div>;
  }

  const chartData = data.map((item) => ({
    name: item._id,
    value: item.amount
  }));

  return (
    <div className="chart-container">
      <h3>Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Monthly Chart Component
 */
export const MonthlyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="empty-chart">No data available</div>;
  }

  const chartData = data.map((item) => ({
    month: item._id,
    amount: item.amount
  }));

  return (
    <div className="chart-container">
      <h3>Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Bar dataKey="amount" fill="#45B7D1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
