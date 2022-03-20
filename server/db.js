const sql = require("mysql");

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loginDB",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("successfully connected");
});
module.exports = db;
