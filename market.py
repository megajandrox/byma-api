from requests import get_request

MARKET_OPEN_URL = "/vanoms-be-core/rest/api/bymadata/free/market-open"

def get_market_status():
    data = get_request(MARKET_OPEN_URL)
    result = True
    print(data)
    if data == b'false':
        result = False
    return result
