const express = require("express");
const readingsController = require("../controllers/readingsController");
const app = express();
const Router = express.Router();
Router.post("/sensor-readings/:id", readingsController.getData);
Router.get("/sensor-readings/:id",readingsController.sendData);
Router.get("/events/:id", readingsController.eventData);

module.exports = Router;
