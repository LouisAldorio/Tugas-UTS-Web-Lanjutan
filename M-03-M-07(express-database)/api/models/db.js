const mysql = require("mysql");
const Config = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: Config.HOST,
  user: Config.USER,
  password: Config.PASSWORD,
  database: Config.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});

module.exports = connection;