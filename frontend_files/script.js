//constants
const url = "https://ceeri-service.onrender.com/";
let curURL = window.location.pathname.toString();
let id = curURL.split("/")

// const btn1 = document.getElementById('btn1');
// const btn2 = document.getElementById('btn2');
//

window.addEventListener("load", getReadings("/"+id[2]));
// btn1.addEventListener('click',()=>{

// });
//
// Create temprature Gauge
var gaugeTemp = new LinearGauge({
  renderTo: "gauge-temperature",
  width: 120,
  height: 400,
  units: "Temperature C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 40,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: ["0", "5", "10", "15", "20", "25", "30", "35", "40"],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
    {
      from: 30,
      to: 40,
      color: "rgba(200, 50, 50, .75)",
    },
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();
//
// Create Humidity Gauge
var gaugeHum = new RadialGauge({
  renderTo: "gauge-humidity",
  width: 300,
  height: 300,
  units: "Humidity (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: ["0", "20", "40", "60", "80", "100"],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
    {
      from: 80,
      to: 100,
      color: "#03C0C1",
    },
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
}).draw();

// <-- Functions -->
async function getReadings(route) {
  fetch(url + "sensor-readings" + route)
    .then((res) => {
      return res.json();
    })
    .then(async (data) => {
      if (data) {
        gaugeTemp.value = data.temperature;
        gaugeHum.value = data.humidity;
      }
      if (data.temperature > 35) {
        if ("serviceWorker" in navigator) {
          registerServiceWorker("temp").catch(console.log);
        }
      }
      if (data.humidity > 95) {
        if ("serviceWorker" in navigator) {
          registerServiceWorker("hum").catch(console.log);
        }
      }
    })
    .catch((err) => console.log(err));
}
function constantReadings(route){
  if (!!window.EventSource) {
    var source = new EventSource(url + "events" + route);
  
    source.addEventListener(
      "open",
      function (e) {
        console.log("Events Connected");
      },
      false
    );
  
    source.addEventListener(
      "error",
      function (e) {
        if (e.target.readyState != EventSource.OPEN) {
          console.log("Events Disconnected");
        }
      },
      false
    );
  
    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (!data) {
        gaugeTemp.value = 0;
        gaugeHum.value = 0;
      }
      gaugeTemp.value = data.temperature;
      gaugeHum.value = data.humidity;
      if (data.temperature > 36) {
        if ("serviceWorker" in navigator) {
          registerServiceWorker("temp").catch(console.log);
        }
      }
      if (data.humidity > 95) {
        if ("serviceWorker" in navigator) {
          registerServiceWorker("hum").catch(console.log);
        }
      }
    };
  }
  
}
constantReadings("/"+id[2]);
