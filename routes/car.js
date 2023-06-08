const express = require("express");
const router = express.Router();

const db=require('../config/db.config')
const mysql = require("mysql");
const connection = mysql.createConnection(db.database);

router.get('/', (req, res) => {
  res.send('this is cars page')
})
module.exports = router;
