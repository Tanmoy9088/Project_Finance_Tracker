import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import FilterBar from "../components/FilterBar";
import AnalyticsChart from "../components/AnalyticsChart";

export default function Dashboard({ onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
      onLogout();
    }
  };

  const addTransaction = async (newTx) => {
    const res = await api.post("/transactions", newTx);
    setTransactions((prev) => [res.data, ...prev]);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
    );
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.text.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? tx.category === category : true;
    const matchDate = (() => {
      if (!dateRange.from && !dateRange.to) return true;
      const date = new Date(tx.date);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;
      return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
    })();
    return matchSearch && matchCategory && matchDate;
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Balance transactions={filtered} />
        <FilterBar
          setSearch={setSearch}
          setCategory={setCategory}
          setDateRange={setDateRange}
        />
        <AddTransaction addTransaction={addTransaction} />
        <TransactionList
          transactions={filtered}
          onDelete={deleteTransaction}
          onUpdate={updateTransaction}
        />
        <AnalyticsChart transactions={filtered} />
      </div>
    </div>
  );
}
