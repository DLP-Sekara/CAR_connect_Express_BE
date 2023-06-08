const express = require("express");
const app = express();
const port = 3000;

const user = require("./routes/user");
const car = require("./routes/car");

app.use(express.json());
app.use("/user", user);
app.use("/car", car);

app.get("/", (req, res) => {
  res.send("Hello Worldwith nodemon!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
