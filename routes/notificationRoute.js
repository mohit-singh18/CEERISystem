const express = require("express");
const notificationController = require("../controllers/notificationController");
const app = express();
const Router = express.Router();

Router.post("/tempNotification/:id", notificationController.tempSubscription);
Router.post("/humNotification/:id", notificationController.humSubscription);

module.exports = Router;
