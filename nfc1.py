import serial
import json
import os
import random
##from twilio.rest import Client
import time
import requests
from pymongo import MongoClient
from pprint import pprint
import sys

import pyttsx3

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def getReading1(portname, baud):


    ##ser = serial.Serial('COM24', 115200)

    ser = serial.Serial(portname, baud)

    print ("connected to: " + ser.portstr)
    reading = {}
    ts1 = int(time.time())


    while True:
        line = ser.readline()
        print("read a line")
        line = line.decode('utf8')
        ##line = line [2:13]
        ##line = line.replace(" ", "")
        line=line.rstrip()
        print(line)
        print(len(line))

        flag = 0

        if '#' in line:
            print("heyoo")
            flag = 1
        
        if '$' in line:
            print("heyoo2")
            flag = 1

        if flag == 0:
            print("reading continues ...")
            continue

        line = line.replace("##", "")
        line = line.replace("??", "")
        print(line) 

        return line


with open('credentials.json', 'r') as f:
    creds = json.load(f)

mongostring = creds["mongodb"]

print (mongostring)
# client = MongoClient("mongodb+srv://user:password@teamzerocluster-mzyhk.mongodb.net/test?retryWrites=true&w=majority")
client = MongoClient(mongostring)
db = client["accessable"]


nfc = getReading1('COM7', 115200)

speak("welcome to the college of business at k state")

flag = 0

for x in db.users.find():
    if x['nfc'] == nfc:
        print("found")
        print(x)
        speak("your user profile has been loaded. the room settings will be adjusted accordingly. thank you and have a nice day.")
        flag = 1
        break

if flag == 0:
    print("user not found")
    speak("please register using the app!")

