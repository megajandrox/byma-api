import json
import os
from requests import post_request
import diskcache as dc

cache = dc.Cache('./cache')

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
CEDEARS_LAST_CACHE = "CEDEARS_LOW_CACHE"
CEDEARS_LONG_CACHE = "CEDEARS_LONG_CACHE"
# Get environment variables
EXPIRATION_CACHE = int(os.getenv("EXPIRATION_CACHE", 500))  # Default to 500 if not set
EXPIRATION_LONG_CACHE = int(os.getenv("EXPIRATION_LONG_CACHE", 172800))  # Default to 172800 if not set
print(f"EXPIRATION_CACHE: {EXPIRATION_CACHE}")
print(f"EXPIRATION_LONG_CACHE: {EXPIRATION_LONG_CACHE}")

def get_cedears_data():
    print("Getting CEDEARS data...")
    cached_data = cache.get(CEDEARS_LAST_CACHE)

    if cached_data:
        print("Returning cached data")
        return cached_data
    # Fetch new data
    print("Fetching data...")
    data = post_request(CEDEARS_URL, payload, headers)
    json_data = json.loads(data)

    # Store in cache only if data is not empty
    if json_data:
        print("Storing new data in cache")
        cache.set(CEDEARS_LAST_CACHE, json_data, expire=EXPIRATION_CACHE)    # 10-minute expiration
        cache.set(CEDEARS_LONG_CACHE, json_data, expire=EXPIRATION_LONG_CACHE) # 48-hours expiration
    else:
        print("No new data available")
        cached_data = cache.get(CEDEARS_LONG_CACHE)
        if cached_data:
            print("Returning cached data")
            return cached_data

    return json_data
