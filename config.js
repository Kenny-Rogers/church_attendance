const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  apollo_server_url: process.env.APOLLO_SERVER_URL
};
