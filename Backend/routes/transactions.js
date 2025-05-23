const express = require("express");
const Transaction = require("../models/Transaction");
// const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/", async (req, res) => {
  const transactions = await Transaction.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const { text, amount } = req.body;
  const newTransaction = new Transaction({ text, amount, user: req.userId });
  await newTransaction.save();
  res.status(201).json(newTransaction);
});

router.put("/:id", async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id, user: req.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
