//including modules
const express = require("express");
const path = require("path");

//including config variables
const { PORT } = require("./config.js");

//immediately invoked function to start server
(() => {
  //creating an express app
  const app = express();

  //APP SETTINGS
  //creating a link to our images,stylesheets and js
  app.use("/public", express.static(path.join(__dirname, "/views/static")));
  //setting up the view engine
  app.set("view engine", "ejs");

  //including router function
  require("./routes")(app);

  //our web application serving webAPP at http://localhost:port
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
