
#include <WiFi.h>

const char* ssid = "TP-Link_9AF6";
const char* password = "26164762";

WiFiServer server(80);

void startWebServer() {
    Serial.print("Connecting to: ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    server.begin();
}

void handleClientRequest() {
    WiFiClient client = server.available();
        if (!client) {
        return;
    }
    // Wait for client
    Serial.println("new client");
    while (!client.available()) {
        delay(1);
    }
    // parse request 
    String req = client.readStringUntil('\r');
    Serial.println(req);
    client.flush();
    // router
    if (req.indexOf("/heading") != -1) {
        Serial.println("request: /heading");
        char data[32] = { '\0' };
        sprintf(data, "\{ \"heading\" : \"%03d\" \}", xHDG);
        String s = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n";
        s += String(data);
        s += "\r\n";
        client.print(s);
        delay(1);
        return;       
    }
    // Prepare the response
    String s = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n";
    s += String(xHTML);
    s += "\r\n";
    client.print(s);
    delay(1);
    Serial.println("Client disonnected");
}

void webserverTask(void*) { 

  VOID SETUP(){               
    Serial.println("Webserver Task");
    startWebServer();
  }
  
  VOID LOOP() {              
    handleClientRequest();
  }
}
