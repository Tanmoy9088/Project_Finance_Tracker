function Balance({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4 text-center">
      <h2 className="text-xl font-bold">Balance Summary</h2>
      <div className="flex justify-around mt-2">
        <div className="text-green-500">Income: ₹{income}</div>
        <div className="text-red-500">Expenses: ₹{Math.abs(expense)}</div>
        <div className="font-semibold">Balance: ₹{income + expense}</div>
      </div>
    </div>
  );
}
export default Balance;
