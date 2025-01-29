import urllib3
from fastapi import FastAPI

from cedears import get_cedears_data
from market import get_market_status

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()

@app.get("/byma-api/cedears")
def get_cedears():
    data = get_cedears_data()
    return data

@app.get("/byma-api/market_status")
def check_market_is_open():
    result = get_market_status()
    return result