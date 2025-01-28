from fastapi import FastAPI
import requests
import urllib3

from cedears import get_cedears_data

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()

BYMA_API_URL = "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/cedears"

HEADERS = {
    "Content-Type": "application/json",
    "muteHttpExceptions": "true",
    "Cache-Control": "no-cache,no-store,max-age=1,must-revalidate",
    "Expires": "1",
    "Options": "renta-variable",
}

PAYLOAD = {
    "excludeZeroPxAndQty": True,
    "T1": True,
    "T0": False
}


@app.get("/byma-api/cedears")
def get_cedears():
    data = get_cedears_data()
    return data