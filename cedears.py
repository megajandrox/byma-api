import http.client
import json
import ssl

context = ssl._create_unverified_context()

conn = http.client.HTTPSConnection("open.bymadata.com.ar", context=context)
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


def get_cedears_data():
    conn.request("POST", "/vanoms-be-core/rest/api/bymadata/free/cedears", payload, headers)
    res = conn.getresponse()
    data = res.read()
    conn.close()
    return json.loads(data)
