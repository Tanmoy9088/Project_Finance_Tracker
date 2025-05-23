const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv= require("dotenv");
dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  const token = generateToken(user._id);
  res.cookie('token', token, { httpOnly: true }).json({ user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = user && await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(user._id);
  res.cookie('token', token, { httpOnly: true }).json({ user });
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
