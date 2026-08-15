import pandas as pd
import json
import os

GADM_DIR = os.path.join(os.path.dirname(__file__), "gadm_data")
MAP_FILE = os.path.join(os.path.dirname(__file__), "mapping.csv")
OUT_FILE = os.path.join(os.path.dirname(__file__), os.pardir, "visited.json")

VISITED = [
# "BR_AC",
# "BR_AL",
# "BR_AP",
# "BR_AM",
# "BR_BA",
# "BR_CE",
# "BR_DF",
# "BR_ES",
# "BR_GO",
# "BR_MA",
# "BR_MT",
# "BR_MS",
# "BR_MG",
# "BR_PA",
# "BR_PB",
# "BR_PR",
# "BR_PE",
# "BR_PI",
"BR_RJ",
# "BR_RN",
# "BR_RS",
# "BR_RO",
# "BR_RR",
# "BR_SC",
"BR_SP",
# "BR_SE",
# "BR_TO",
"DE_BW",
# "DE_BY",
# "DE_BE",
# "DE_BR",
# "DE_HB",
# "DE_HH",
"DE_HE",
# "DE_MV",
# "DE_NI",
# "DE_NW",
"DE_RP",
"DE_SL",
# "DE_SN",
# "DE_ST",
# "DE_SH",
# "DE_TH",
# "FR_AR",
# "FR_BF",
# "FR_BT",
# "FR_CN",
# "FR_CE",
"FR_AO",
# "FR_NC",
"FR_IF",
# "FR_ND",
# "FR_AC",
# "FR_LP",
# "FR_PL",
# "FR_PR",
# "IN_AN",
"IN_AP",
# "IN_AR",
"IN_AS",
"IN_BR",
# "IN_CH",
# "IN_CT",
# "IN_DN",
# "IN_DD",
# "IN_GA",
# "IN_GJ",
"IN_HR",
# "IN_HP",
"IN_JH",
"IN_KA",
"IN_KL",
# "IN_LD",
# "IN_MP",
# "IN_MH",
# "IN_MN",
"IN_ML",
# "IN_MZ",
# "IN_NL",
"IN_DL",
"IN_OR",
"IN_PY",
# "IN_PB",
# "IN_RJ",
# "IN_SK",
"IN_TN",
# "IN_TG",
# "IN_TR",
"IN_UP",
"IN_UT",
"IN_WB",
# "LU_CL",
# "LU_DI",
# "LU_RE",
# "LU_VI",
# "LU_WI",
# "LU_EC",
# "LU_GR",
# "LU_RE",
# "LU_CA",
# "LU_ES",
"LU_LU",
# "LU_ME",
# "ES_AN",
# "ES_AR",
# "ES_CB",
# "ES_CM",
# "ES_CL",
# "ES_CT",
# "ES_ML",
# "ES_MD",
# "ES_NA",
# "ES_VC",
# "ES_EX",
# "ES_GA",
"ES_PM",
# "ES_CN",
# "ES_LO",
# "ES_PV",
# "ES_AS",
# "ES_MU",
]

mapping = pd.read_csv(MAP_FILE)
output_features = []
for region_id in VISITED:
    map_details = mapping[mapping["CC_EE"] == region_id]
    lvl = map_details["GADM_LVL"].iat[0]
    region_code = map_details["GADM_CODE"].iat[0]
    print(map_details)
    country_code, state_code = region_id.split("_")
    country_file = os.path.join(GADM_DIR, f"{country_code}_{lvl}.json")
    with open(country_file, "r", encoding="utf-8") as f:
        country_data = json.load(f)

    for feature in country_data["features"]:
        properties = feature.get("properties", {})
        if properties.get(f"GID_{lvl}") == region_code:
            output_features.append(feature)
            break

output = {
    "type": "FeatureCollection",
    "features": output_features
}

with open(OUT_FILE, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)