require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL || 30,
  PORT: process.env.APP_PORT || 8000
};
