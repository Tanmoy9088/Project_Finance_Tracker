import { useState } from 'react';

function AddTransaction({ addTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold mt-4 mb-2">Add new transaction</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Enter description..."
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Enter amount (+/-)"
      />
      <button className="bg-blue-500 w-full text-white py-2 rounded hover:bg-blue-600">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction;
