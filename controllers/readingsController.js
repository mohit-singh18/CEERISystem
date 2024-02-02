const Data = require("../models/data");
const express = require("express");
const app = express();
let latestReadings ={};
const getData = (req, res) => {
  // console.log(req.params['id']);
  const deviceID = req.params['id'];
  latestReadings[deviceID] =req.body;
  // console.log(app.get('data'))
  try {
    // const savedData = await newData.save();
    res.setHeader( "Access-Control-Allow-Origin", "https://ceeri-service.onrender.com/" );
    res.status(201).json();
    // console.log();
  } catch (err) {
    res.status(400).json(err);
  }
};
const sendData = (req, res) => {
  const deviceID = req.params['id'];
  res.setHeader( "Access-Control-Allow-Origin", "https://ceeri-service.onrender.com/" );
  res.status(200).json(latestReadings[deviceID]);
};
const eventData = (req, res) => {
  const deviceID = req.params['id'];
  const headers = {
    'Content-type': 'text/event-stream',
    'Connection' : 'keep-alive',
    'Cache-Control' : 'no-cache',
    'Access-Control-Allow-Origin':  'https://ceeri-service.onrender.com/'
  };
  res.writeHead(200,headers);

  const interval = setInterval(() => {
    // console.log(app.get("data"));
    res.write(`data: ${JSON.stringify(latestReadings[deviceID])}\n\n`);
  },2500);
  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
};
module.exports = { getData, sendData, eventData, latestReadings };
