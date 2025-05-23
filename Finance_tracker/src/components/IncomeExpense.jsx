function IncomeExpense({ transactions }) {
  const amounts = transactions.map((t) => t.amount);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = (
    amounts.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1
  ).toFixed(2);

  return (
    <div className="flex justify-between bg-gray-100 p-4 rounded mb-4">
      <div>
        <h4 className="text-green-600 font-semibold">Income</h4>
        <p className="text-green-700">${income}</p>
      </div>
      <div>
        <h4 className="text-red-600 font-semibold">Expense</h4>
        <p className="text-red-700">${expense}</p>
      </div>
    </div>
  );
}

export default IncomeExpense;
