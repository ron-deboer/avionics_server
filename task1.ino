
void blinkTask(void*) { 

  VOID SETUP(){               
    Serial.println("Blink Task");  
    pinMode(2,OUTPUT);
  }
  
  VOID LOOP() {              
    digitalWrite(2,HIGH);
    DELAY(500);              
    digitalWrite(2,LOW);
    DELAY(500);
  }
}

