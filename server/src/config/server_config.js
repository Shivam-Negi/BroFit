const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  URL: process.env.MONGO_URI,
  PORT: process.env.PORT || 7000,
  JWT_EXPIRY : process.env.JWT_EXPIRY,
  JWT_SECRET : process.env.JWT_SECRET,
  GMAIL_EMAIL : process.env.GMAIL_EMAIL,
  GMAIL_PASS : process.env.GMAIL_PASS,
  RESET: process.env.RESET_URI,
};
