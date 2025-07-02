const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new CustomError('Please provide username and password', 400);

  //just for demo. normally provided by DB
  const id = new Date().getDate();

  //try to keep payload small. better experience for user
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res
    .status(200)
    .json({ status: 'success', data: `User created with token`, token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    status: 'success',
    data: `Hello ${req.user.username} Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
