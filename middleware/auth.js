const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');

const authMiddleware = (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomError('No token provided', 401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomError('Not authorised to access this route', 401);
  }
};

module.exports = authMiddleware;
