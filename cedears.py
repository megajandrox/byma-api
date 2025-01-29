import json
from requests import post_request

payload = json.dumps({
    "excludeZeroPxAndQty": True,
    "T1": True,
    "T0": False
})
headers = {
    'Content-Type': 'application/json',
    'muteHttpExceptions': True,
    'Cache-Control': 'no-cache,no-store,max-age=1,must-revaliidate',
    'Expires': 1,
    'Options': 'renta-variable',
}
CEDEARS_URL = "/vanoms-be-core/rest/api/bymadata/free/cedears"

def get_cedears_data():
    data = post_request(CEDEARS_URL, payload, headers)
    return json.loads(data)
