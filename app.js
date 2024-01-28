const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRoute = require("./routes/login");
const sensorReadings = require("./routes/sensor-readings");
const homePage = require("./routes/homePage");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//
dotenv.config();
//
//INIT
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// mongo setup
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose
  .connect(process.env.MONGO_URL,clientOptions)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log(`${e}`);
  });

//
app.use(express.static(path.join(__dirname, "./frontend_files")));
app.use(express.static(path.join(__dirname, "./frontend_files/files")));
//routes
app.use("/", homePage);
app.use("/api/", authRoute);
app.use("/", sensorReadings);

//
app.listen(
    process.env.PORT,
    "44.225.181.72",
    console.log(`Listening to port ${process.env.PORT}`)
  );
