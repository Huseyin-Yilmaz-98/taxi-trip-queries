from datetime import datetime
import json
import os
import requests

api_key = input("Api key: ")

if "taxi+_zone_lookup.csv" not in os.listdir():
    print("taxi+_zone_lookup.csv not found in the directory.")
    exit()


with open("taxi+_zone_lookup.csv","r") as f:
    header = f.readline().replace("\"","").strip().split(",")
    lines = [line.replace("\"","").strip().split(",") for line in f.readlines()]


final_data = []

for sl in lines:
    if "" in sl or sl[2] == "Unknown":
        continue
    try:
        location = requests.get("https://maps.googleapis.com/maps/api/geocode/json", params = {
            "address": sl[2] + " "+ sl[1],
            "key": api_key
        }).json()["results"][0]["geometry"]["location"]
        final_data.append({
            "id": int(sl[0]),
            "borough": sl[1],
            "zone": sl[2],
            "latitude": location["lat"],
            "longitude": location["lng"]
        })
    except:
        print(sl[2])
        final_data.append({
            "id": int(sl[0]),
            "borough": sl[1],
            "zone": sl[2],
            "latitude": None,
            "longitude": None
        })

with open("zones.json","w",encoding="utf-8") as f:
    json.dump(final_data, f, indent = 4)
