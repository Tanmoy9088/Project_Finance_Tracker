import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#8884d8", "#0088FE"];

const groupByCategory = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    if (t.amount < 0) {
      grouped[t.category] = (grouped[t.category] || 0) + Math.abs(t.amount);
    }
  });
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

const groupByMonth = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const key = `${month}`;
    grouped[key] = grouped[key] || { income: 0, expense: 0 };
    if (t.amount >= 0) {
      grouped[key].income += t.amount;
    } else {
      grouped[key].expense += Math.abs(t.amount);
    }
  });

  return Object.entries(grouped).map(([name, data]) => ({
    name,
    ...data,
  }));
};

function AnalyticsChart({ transactions }) {
  const categoryData = groupByCategory(transactions);
  const monthlyData = groupByMonth(transactions);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">📊 Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Monthly Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#00C49F" />
              <Bar dataKey="expense" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default AnalyticsChart;
