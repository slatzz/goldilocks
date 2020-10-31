//////////////////////////// REQUIRED VARIABLES ////////////////////////////
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//////////////////////////// MIDDLEWARE ////////////////////////////
const app = express();
app.use(express.json()); // req.body
app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));

app.use(cookieParser());

//////////////////////////// ROUTES ////////////////////////////
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

//////////////////////////// CONFIRM DATABASE CONNECTION ////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
