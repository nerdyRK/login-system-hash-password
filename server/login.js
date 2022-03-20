const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./db");

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users(name,password) VALUES (?,?)",
      [name, hash],
      (err, result) => {
        if (err) {
          if (err.code == "ER_DUP_ENTRY")
            res.send({ err: "user already exists" });
        } else {
          res.send({ msg: "" }); //just bcz exist was not working in frontend
          console.log(result);
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  db.query(
    // "SELECT * FROM users WHERE name=? AND password=?",
    "SELECT * FROM users WHERE name=?",
    name,
    (err, result) => {
      if (err) console.log(err);

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            // console.log(result);
            res.send(result);
          } else {
            res.send({ msg: "WRONG username/password combination" });
          }
        });
      } else {
        res.send({ msg: "user doesn't exist." });
      }
    }
  );
});

app.listen(5000);
