import http.client
import ssl

HOSTNAME = "open.bymadata.com.ar"

def get_connection():
    context = ssl._create_unverified_context()
    conn = http.client.HTTPSConnection(HOSTNAME, context=context)
    return conn