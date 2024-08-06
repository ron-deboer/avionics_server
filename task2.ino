
#include <Wire.h>
#include <LSM303.h>

LSM303 compass;

int HDG = 0;

void compassTask(void*) { 

  VOID SETUP(){               
    Serial.println("Compass Task");  
    Wire.begin();
    compass.init();
    compass.enableDefault();
    // calibration
    compass.m_min = (LSM303::vector<int16_t>){ -32767, -32767, -32767 };
    compass.m_max = (LSM303::vector<int16_t>){ +32767, +32767, +32767 };
  }
  
  VOID LOOP() {              
    compass.read();
    float heading = compass.heading();
    Serial.println(heading);
    HDG = (int)heading;
    xHDG = HDG;
    delay(1000);
  }
}
