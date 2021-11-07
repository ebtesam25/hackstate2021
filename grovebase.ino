#include "DHT.h"
#include <Arduino.h>
#include <U8x8lib.h>

#include "Seeed_BMP280.h"
#include <Wire.h>
 
BMP280 bmp280;


 
#define DHTPIN 3     // what pin we're connected to
#define DHTTYPE DHT11   // DHT 11 
DHT dht(DHTPIN, DHTTYPE);

 
U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);
 
unsigned long myTime;
int soundPin = A2; // Analog sound sensor is to be attached to analog
int lightPin = A6; //Analog light sensor is to be attached to analog
int ledPin = 4; // Digital LED is to be attached to digital
const int buttonPin = 6;     // the number of the pushbutton pin
int buttonState = 0;         // variable for reading the pushbutton status
int ledState = 0;
int rotaryPin = A0;    // select the input pin for the rotary
int rotaryValue = 0;  // variable to store the value coming from the rotary
int BuzzerPin = 5;

 
void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(lightPin, INPUT);
  pinMode(soundPin, INPUT);
  pinMode(buttonPin, INPUT);
  pinMode(rotaryPin, INPUT); //emulate PM5 particulates
  pinMode(BuzzerPin, OUTPUT); //particulate warning
  Serial.begin(115200); 
  Serial.println("DHTxx test!");
  if (!bmp280.init()) {
        Serial.println("Device not connected or broken!");
    }
  dht.begin();
  u8x8.begin();
  u8x8.setPowerSave(0);  
  u8x8.setFlipMode(1);
  myTime = 0;
}
 
void loop(){
  int soundState = analogRead(soundPin); // Read sound sensor’s value
  int lightState = analogRead(lightPin); // Read light sensor’s value
  // if the sound sensor's value is greater than 500 or the sound sensor's is less than 200, the light will be on.
  //Otherwise, the light will be turned off
if (soundState > 700 || lightState < 200) {
  digitalWrite(ledPin, HIGH);
  ledState = 1;
  delay(50); //You can add the "//" to remove the delay
}else{
  digitalWrite(ledPin, LOW);
  ledState = 0;
} 

   buttonState = digitalRead(buttonPin);
 
  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on if off, or toggle:
    if (ledState == 0) {
    digitalWrite(ledPin, HIGH);
    ledState = 1;
    } else {
    digitalWrite(ledPin, LOW);
    ledState = 0;
    }
  }
  
  float temp, humi, pressure;

  if (millis() - myTime >= 1500) {
    analogWrite(BuzzerPin, 0);
    myTime = millis();
    temp = dht.readTemperature();
    humi = dht.readHumidity();
    rotaryValue = analogRead(rotaryPin);
   
    u8x8.setFont(u8x8_font_chroma48medium8_r);
    u8x8.setCursor(0, 33);
    u8x8.print("Temp:");
    u8x8.print(temp);
    u8x8.print("C");
    u8x8.setCursor(0,50);
    u8x8.print("Humidity:");
    u8x8.print(humi);
    u8x8.print("%");
    u8x8.refreshDisplay();
    Serial.print("##");
    Serial.print(temp);
    Serial.print(":");
    Serial.print(humi);

     
 
    //get and print temperatures
    Serial.print(":");
    Serial.print(bmp280.getTemperature());
    Serial.print(":"); // The unit for  Celsius because original arduino don't support speical symbols

    Serial.print(soundState);
    //get and print light and sound data
    Serial.print(":");
    Serial.print(lightState);
    //get and print atmospheric pressure data
    Serial.print(":");
    Serial.print(pressure = bmp280.getPressure());
    //Serial.print(":");
 
    //get and print altitude data
    Serial.print(":");
    Serial.print(bmp280.calcAltitude(pressure));
    Serial.print(":");
    Serial.println(rotaryValue);
 
    Serial.println("\n");//add a line between output of different times.

    if (rotaryValue > 500) {
      analogWrite(BuzzerPin, 128);
    } else {
      analogWrite(BuzzerPin, 0);
    }
 
    //delay(1000);

  }
  
  //delay(200);
}
