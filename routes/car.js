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
    const userTable = `
  CREATE TABLE IF NOT EXISTS car (
    cid int PRIMARY KEY,
    brand varchar(255),
    model varchar(255),
    color varchar(255),
    fuelType varchar(255),
    mileage double,
    transmission varchar(255),
    conditionType varchar(255),
    engineCapacity varchar(255),
    image_data LONGBLOB
  )`;
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
  var query = "SELECT * FROM car";
  connection.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

//save
router.post("/", (req, res) => {
  const cid = req.body.cid;
  const brand = req.body.brand;
  const model = req.body.model;
  const color = req.body.color;
  const fuelType = req.body.fuelType;
  const mileage = req.body.mileage;
  const transmission = req.body.transmission;
  const conditionType = req.body.conditionType;
  const engineCapacity = req.body.engineCapacity;
  const image_data = req.body.image_data;

  var query = `INSERT INTO car (
      cid, 
      brand, 
      model,
      color,
      fuelType,
      mileage,
      transmission,
      conditionType,
      engineCapacity,
      image_data) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [
      cid,
      brand,
      model,
      color,
      fuelType,
      mileage,
      transmission,
      conditionType,
      engineCapacity,
      image_data,
    ],
    (err) => {
      if (err) {
        res.send({ message: err });
        //throw err;
      } else {
        res.send({ message: "user added" });
      }
    }
  );
});

//update
router.put("/", (req, res) => {
  const cid = req.body.cid;
  const brand = req.body.brand;
  const model = req.body.model;
  const color = req.body.color;
  const fuelType = req.body.fuelType;
  const mileage = req.body.mileage;
  const transmission = req.body.transmission;
  const conditionType = req.body.conditionType;
  const engineCapacity = req.body.engineCapacity;
  const image_data = req.body.image_data;
  var query = `UPDATE car SET 
  brand=?,
  model=?, 
  color=?,
  fuelType=?, 
  mileage=?,
  transmission=?, 
  conditionType=?,
  engineCapacity=?,
  image_data=?
  WHERE cid=?`;
  connection.query(
    query,[
      brand,
      model,
      color,
      fuelType,
      mileage,
      transmission,
      conditionType,
      engineCapacity,
      image_data,
      cid
    ],
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        if (rows.affectedRows > 0) {
          res.send({ message: "car updated" });
        } else {
          res.send({ message: "car not found" });
        }
      }
    }
  );
  console.log(req.body);
});

//delete
router.delete("/:cid", (req, res) => {
  const id = req.params.cid;
  var query = "DELETE FROM car WHERE cid=?";
  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);
    if (rows.affectedRows > 0) {
      res.send({ message: "car deleted" });
    } else {
      res.send({ message: "car not found" });
    }
  });
});

//search
router.get("/:cid", (req, res) => {
  const id = req.params.cid;
  var query = "SELECT * FROM car WHERE cid=?";
  connection.query(query, [id], (err, rows, fields) => {
    if (err) console.log(err);
    res.send(rows);
  });
});
module.exports = router;
