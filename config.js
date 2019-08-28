const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  apollo_server_url: process.env.APOLLO_SERVER_URL,
  sms_api_id: process.env.CLIENT_ID,
  sms_api_secret: process.env.CLIENT_SECRET,
  sms_api_url: process.env.SMS_API_URL,
  sms_from: process.env.SMS_FROM
};
