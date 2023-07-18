#include "DHT.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define DHTPIN 26    // Digital pin connected to the DHT sensor

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321


//INIT
DHT dht(DHTPIN, DHTTYPE);
const char* ssid = "w-i-f-i!!";
const char* password = "mohit123";
String serverName = "http://192.168.46.235:5000/sensor-readings";
//


void setup() {
  Serial.begin(19200);
  
  Serial.println(F("DHTxx test!"));
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network!! ");

  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);
  if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      // Your Domain name with URL path or IP address with path
      http.begin(serverName + "/QTC");
      http.addHeader("Content-Type", "application/json");
      //
      DynamicJsonDocument doc(2048);
      doc["humidity"] = h;
      doc["temperature"] = t;
      doc["heatindex"] = hic;
      String json;
      serializeJson(doc, json);

      int httpResponseCode = http.POST(json);
      String response = http.getString();
      // Serial.println(json);
      Serial.println(httpResponseCode);
      Serial.println(response);
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  
 
}