const express = require("express");
const bodyParser = require("body-parser");
const config = require("./api/config/db.config.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Louis Aldorio" });
});

require("./api/routes/user.route.js")(app);

const port = config.PORT || 3000
app.listen(port, () => {
  console.log("Server is running on port "+ port);
});