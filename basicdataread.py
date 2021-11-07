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



with open('credentials.json', 'r') as f:
    creds = json.load(f)

mongostring = creds["mongodb"]

print (mongostring)
# client = MongoClient("mongodb+srv://user:password@teamzerocluster-mzyhk.mongodb.net/test?retryWrites=true&w=majority")
client = MongoClient(mongostring)
db = client["accessable"]




lat1 = 39.18921085
lon1 = -96.5768806
name1 = "collegeofbusiness"




def getReading1(portname, baud):
    global lat1
    global lon1
    global name1

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
        if len(line)<19:
            continue
        line = line.replace("##", "")
        line = line.replace("??", "")
        print(line) 

        words = line.split(":")

        t = float(words[0])
        h = float(words[1])
        t2 = float(words[2])
        s = int(words[3])
        l = int(words[4])
        p = float(words[5])
        a = float(words[6])
        d = int(words[7])
        
        
        # s = int(words[4])

        if h == 0.0 or t == 0.0:
            continue
        else:
            reading["hum"] = h
            reading["temp"] = t
            reading["noise"] = s
            # reading["water"] = w
            reading["pressure"] = p
            reading["light"] = l
            reading["alt"] = a
            reading["dust"] = d

            if d > 300:
                speak("warning!! High dust particulate levels detected!")
            
            reading["time"] = ts1
            reading["lat"] = lat1
            reading["lon"] = lon1
            reading["building"] = name1

            print (reading)
            return reading
        
        continue

        return ts1
        

        
        
# [ts1, ts2, diff] = getReading('COM24', 115200)
while True:

    reading = getReading1('COM8', 115200)
    ts = int(time.time())

    payload = {}
    payload = reading

    payload ["id"] = "1"
    payload ["time"] = str(ts)
    payload ["roomid"] = "1"
    # payload ["reading"] = reading



    print ("payload ready")
    print (payload)

    # outstring = str(reading["temp"])+":"+str(reading["humid"])+":"+str(reading["uv"])+":"+str(reading["soil"])
    # print(outstring)


    # txid = key.send([('mmRjZNRwjz3GCBfknxQpUc8SHaPgtq3Hft',0.00001,'btc')],message=outstring)
    # print(txid)


    # tids1 = key.get_transactions()
    # tids2 = key2.get_transactions()

    # print (tids1)
    # print (tids2)

    result=db.rooms.insert_one(payload)
    print (result.inserted_id)
    print (db)

    time.sleep(2)