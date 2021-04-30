from datetime import datetime
import json
import random
import os

if "yellow_tripdata_2020-12.csv" not in os.listdir():
    print("yellow_tripdata_2020-12.csv not found in the directory.")
    exit()


print("Reading file...")


with open("yellow_tripdata_2020-12.csv","r") as f:
    header = f.readline().strip().split(",")
    lines = [line.strip().split(",") for line in f.readlines()]

print("File read. Shuffling lines...")

random.shuffle(lines)

min_row_count = int(input("Minimum number of records to be included from each day of the month: "))
max_row_count = int(input("Maximum number of records to be included from each day of the month: "))

data_by_day = {}

for i in range(1,32):
    data_by_day.update({i: []})

for sl in lines:
    if "" in sl or sl[7] == sl[8] or sl[7] in ["264", "265"] or sl[8] in ["264", "265"]:
        continue

    el ={
        "pickedUpAt": sl[1],
        "droppedOffAt": sl[2],
        "passengerCount": int(sl[3]),
        "distance": float(sl[4]),
        "pickUpLocationId": int(sl[7]),
        "dropOffLocationId": int(sl[8]),
        "fareAmount": float(sl[10]),
        "extra": float(sl[11]),
        "mtaTax": float(sl[12]),
        "tip": float(sl[13]),
        "tolls": float(sl[14]),
        "improvementSurcharge": float(sl[15]),
        "totalAmount": float(sl[16]),
        "congestionSurcharge": float(sl[17])
    }
    day = datetime.strptime(sl[1],"%Y-%m-%d %H:%M:%S").day
    data_by_day[day].append(el)


final_data = []


for i in range(1,32):
    final_data += data_by_day[i][:(random.randint(min_row_count, max_row_count))]


print("Writing into file...")


with open("trips.json","w",encoding="utf-8") as f:
    json.dump(final_data, f, indent = 4)


print("Files saved!")
