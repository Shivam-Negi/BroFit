const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  URL: process.env.MONGO_URI,
  PORT: process.env.PORT || 7000,
};
