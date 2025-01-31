from connection import get_connection

def post_request(url, payload, headers):
    conn = None
    try:
        print("Getting connection...")
        conn = get_connection()
        conn.request("POST", url, payload, headers)
        res = conn.getresponse()

        # Check if the status code is not 200 (OK)
        if res.status != 200:
            error_data = res.read()
            raise Exception(f"Request failed with status code {res.status}: {error_data}")
        print("Got response")
        # If status code is 200, read and return the data
        data = res.read()
        return data
    finally:
        # Ensure the connection is closed, even if an exception occurs
        if conn:
            conn.close()

def get_request(url):
    conn = None
    try:
        print("Getting connection...")
        conn = get_connection()
        conn.request("GET", url)
        res = conn.getresponse()

        # Check if the status code is not 200 (OK)
        if res.status != 200:
            error_data = res.read()
            raise Exception(f"Request failed with status code {res.status}: {error_data}")
        print("Got response")
        # If status code is 200, read and return the data
        data = res.read()
        return data

    finally:
        # Ensure the connection is closed, even if an exception occurs
        if conn:
            conn.close()
