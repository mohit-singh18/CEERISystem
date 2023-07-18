const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  heatindex: { type: Number, required: true },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
