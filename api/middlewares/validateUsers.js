const { Users } = require('../models');

const displayNameIsValid = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const hasEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  if (
    !email
    || email === '@gmail.com' || !email.includes('@')
    || !email.includes('.com')
  ) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

const hasPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;
  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const isUnicEmail = async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await Users.findOne({ where: { email } });
  if (userEmail) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  next();
};

const validateUser = [
  displayNameIsValid,
  hasEmail,
  isValidEmail,
  hasPassword,
  isPasswordValid,
  isUnicEmail,
];

module.exports = {
  validateUser,
};