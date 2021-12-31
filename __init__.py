import os
from termcolor import colored
from pyfiglet import Figlet
from os import system
import time
import random
import string
from client.logkey import logkey
from datetime import datetime, date
import json
import sys

with open("./client/settings.json") as jsonFile:
    data = json.load(jsonFile)
    jsonFile.close()

name = data["parameters"][0]["name"]
version = data["parameters"][0]["version"]

now = datetime.now()
today = date.today()

current_time = now.strftime("%H:%M:%S")
d1 = today.strftime("%d/%m/%Y")

system("title Initialisation en cours..")
print("Le programme est en cours de lancement, veuillez patienter..")
clear = lambda: os.system('cls')

f = open("./client/connection/logs.yml", "w")
f.write("Last Session Connection: " + d1 + " (" + current_time + ")")
f.write("\nSession ID Key: " + logkey())
f.close()

f = open("./client/connection/history.yml", "a")
f.write("[" + name + " " + version + "] \n  - Session Connection: " + d1 + " (" + current_time + ")\n  - Session ID Key: " + logkey() + "\n  - Argument: " + ''.join(sys.argv) + "\n")
f.close()

time.sleep(3)
os.system("start .\client\launch.bat")