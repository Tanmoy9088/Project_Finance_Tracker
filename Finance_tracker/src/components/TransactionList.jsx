import { useState } from "react";
import api from "../api";

function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    text: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleEdit = (tx) => {
    setEditingId(tx._id);
    setEditForm({ ...tx, amount: tx.amount.toString() });
  };

  const saveEdit = async () => {
    const updated = await api.put(`/transactions/${editingId}`, editForm);
    onUpdate(updated);
    setEditingId(null);
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">💸 Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow flex justify-between items-center"
            >
              {editingId === tx._id ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editForm.text}
                    onChange={(e) =>
                      setEditForm({ ...editForm, text: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    type="date"
                    value={editForm.date?.slice(0, 10)}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    className="input"
                  />
                  <button
                    onClick={saveEdit}
                    className="btn btn-sm bg-green-500 text-white px-3 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-medium">{tx.text}</div>
                    <div className="text-sm text-gray-500">
                      ₹{tx.amount} | {tx.category} |{" "}
                      {new Date(tx.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(tx._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TransactionList;
