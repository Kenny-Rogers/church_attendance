const dotenv = require("dotenv");
dotenv.config();

const config = {
  PORT: 3000
};

module.exports = {
  port: process.env.PORT,
  apollo_server_url: process.env.APOLLO_SERVER_URL
};

module.exports = config;
