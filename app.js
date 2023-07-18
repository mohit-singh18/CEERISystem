const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRoute = require("./routes/login");
const sensorReadings = require("./routes/sensor-readings");
const homePage = require("./routes/homePage");
const path = require("path");
const cors = require("cors");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const notificationRoute = require("./routes/notificationRoute");

const app = express();
//
dotenv.config();
const public_key =
  "BHYvQoGPabiaYCItSzuDI8APJskp-KsbFOd2R_6UJBQWdgWYdLh39aN_x0lmJFh5bsOV1V9x0i1jNlaGZHdD0tM";
//
//INIT
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch((e) => {
//     console.log(`${e}`);
//   });
webpush.setVapidDetails(
  "mailto:test@test.com",
  public_key,
  process.env.private_key
);
//
app.use(express.static(path.join(__dirname, "./frontend_files")));
app.use(express.static(path.join(__dirname, "./frontend_files/files")));
//routes
app.use("/", homePage);
app.use("/api/", authRoute);
app.use("/", sensorReadings);
app.use("/", notificationRoute);

//
app.listen(
    process.env.PORT,
    "0.0.0.0",
    console.log(`Listening to port ${process.env.PORT}`)
  );
