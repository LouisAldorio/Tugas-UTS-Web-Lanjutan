const express = require("express");
const bodyParser = require("body-parser");
const config = require("./api/config/db.config.js");
const {verify} = require('./api/middleware/auth')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Louis Aldorio" });
});

require("./api/routes/user.route.js")(app);

app.use(verify)
require("./api/routes/secret.route.js")(app);

const port = config.PORT || 3000
app.listen(port, () => {
  console.log("Server is running on port "+ port);
});