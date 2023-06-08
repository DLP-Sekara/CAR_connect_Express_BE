const express = require("express");
const router = express.Router();

const db = require("../config/db.config");
const mysql = require("mysql");
const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected to the mysql server");
    const userTable =
      "CREATE TABLE IF NOT EXISTS user (id int PRIMARY KEY,email varchar(255),password varchar(255))";
    connection.query(userTable, (err, result) => {
      if (err) throw err;
      if (result.warningCount === 0) {
        console.log("user table crated");
      }
    });
  }
});

//get all
router.get("/", (req, res) => {
  var query = "SELECT * FROM user";
  connection.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

//save
router.post("/", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;

  var query = "INSERT INTO user (id,email,password) VALUES (?,?,?)";
  connection.query(query, [id, email, password], (err) => {
    if (err) {
      res.send({ message: "Error" });
      //throw err;
    } else {
      res.send({ message: "user added" });
    }
  });
});

//update
router.put("/", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  var query = "UPDATE user SET email=?,password=? WHERE id=?";
  connection.query(query, [email, password, id], (err, rows) => {
    if (err) {
      throw err;
    } else {
      if (rows.affectedRows > 0) {
        res.send({ message: "user updated" });
      } else {
        res.send({ message: "user not found" });
      }
    }
  });
  console.log(req.body);
});

//delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  var query = "DELETE FROM user WHERE id=?";
  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);
    if (rows.affectedRows > 0) {
      res.send({ message: "user deleted" });
    } else {
      res.send({ message: "user not found" });
    }
  });
});

//search
router.get("/:id", (req, res) => {
  const id = req.params.id;
  var query = "SELECT * FROM user WHERE id=?";
  connection.query(query, [id], (err, rows, fields) => {
    if (err) console.log(err);
    res.send(rows);
  });
});
module.exports = router;
