import http.client
import ssl

context = ssl._create_unverified_context()

conn = http.client.HTTPSConnection("open.bymadata.com.ar", context=context)

def get_market_status():
    conn.request("GET", "/vanoms-be-core/rest/api/bymadata/free/market-open")
    res = conn.getresponse()
    data = res.read()
    result = True
    print(data)
    if data == b'false':
        result  = False
    conn.close()
    return result
