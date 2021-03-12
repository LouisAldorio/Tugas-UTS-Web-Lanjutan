const express = require("express");
const bodyParser = require("body-parser");
const config = require("./api/config/db.config.js");
const {verify} = require('./api/middleware/auth')
const user = require('./api/./controllers/user.controller.js')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome Louis Aldorio" });
});

// Create or register user
app.post("/users/register", user.create);

//login user
app.post("/users/login",user.login)


app.use(verify)
require("./api/routes/user.route.js")(app);
require("./api/routes/secret.route.js")(app);


const port = config.PORT || 3000
app.listen(port, () => {
  console.log("Server is running on port "+ port);
});