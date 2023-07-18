const webpush = require("web-push");
const readings = require("./readingsController");
module.exports = {
  tempSubscription: (req, res) => {
    const params = req.params;
    const subscription = req.body;
    res.status(200).json({});
    const payload = JSON.stringify({
      title: "Alert!!",
      body: `Temperature Increased in room ${params['id']}.`,
    });

    // console.log(params);
    webpush.sendNotification(subscription, payload).catch(console.log);
  },
  humSubscription: (req, res) => {
    const params = req.params;
    const subscription = req.body;
    res.status(200).json({});
    const payload = JSON.stringify({
      title: "Alert!!",
      body: `Humidity Increased in room ${params['id']}`,
    });
    
    webpush.sendNotification(subscription, payload).catch(console.log);
  },
};
