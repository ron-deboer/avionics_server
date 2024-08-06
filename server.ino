#include "FS.h"
#include "SD.h"
#include "SPI.h"

#include <TridentTD_EasyFreeRTOS32.h>

EasyFreeRTOS32   task1, task2, task3; 
void blinkTask(void*), compassTask(void*), webserverTask(void*); 

char HTML[2048];
char *xHTML;
int xHDG;

void readHtmlFile(char* path, char* pHTML) {
    Serial.print("Reading file: ");
    Serial.println(path);
    File file = SD.open(path);
    if (!file) {
        Serial.println("Failed to open file for reading");
        return;
    }
    Serial.println("/index.html opened ok");
    unsigned int f = file.size();
    file.read((uint8_t*)pHTML, f);
    pHTML[f] = 0x00;
    file.close();
}

void setup() {
    Serial.begin(115200); 
    Serial.println();
    if (!SD.begin()) {
        Serial.println("Card Mount Failed");
        return;
    }   
    readHtmlFile("/index.html", HTML);
    xHTML = HTML;

    task1.start( blinkTask );     
    task2.start( compassTask );    
    task3.start( webserverTask );  
}

void loop() {}               

