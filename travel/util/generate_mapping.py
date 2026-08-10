import json
import csv
import os

GADM_DIR = os.path.join(os.path.dirname(__file__), "gadm_data")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "mapping.csv")
row = []

for file in os.listdir(GADM_DIR):
    if file.endswith(".json"):
        with open(os.path.join(GADM_DIR, file), 'r', encoding='utf-8') as f:
            data = json.load(f)
            country_name = data['name'].split('_')[-2]
            if country_name == "LUX":
                gadm_lvl = "GID_2"
                hasc_lvl = "HASC_2"
            else:
                gadm_lvl = "GID_1"
                hasc_lvl = "HASC_1"
            for feature in data['features']:
                gadm_code = feature['properties'][gadm_lvl]
                hasc_code = feature['properties'][hasc_lvl]
                hasc_code_list = hasc_code.split('.')
                hasc_code = hasc_code_list[0] + '_' + hasc_code_list[-1]
                # print(hasc_code, gadm_code)
                prefix = gadm_code.split(".")[0]
                if len(prefix) == 3 and prefix.isalpha() and prefix.isupper(): 
                    row.append([hasc_code, gadm_lvl[-1], gadm_code])

with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['CC_EE', 'GADM_LVL', 'GADM_CODE'])
    writer.writerows(row)