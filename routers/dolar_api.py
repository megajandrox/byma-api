import json
from typing import List
from fastapi import APIRouter, HTTPException, Query
import http.client

from logger.api_logger import logger

router = APIRouter()
'''
We are using https://dolarapi.com/docs/argentina/
to retrieve the data from exchange values
'''
@router.get("/dollars")
async def get_dollar_by_name(names: List[str] = Query(..., description="List of dollar types to fetch")):
    try:
        conn = http.client.HTTPSConnection("dolarapi.com")
        conn.request("GET", "/v1/dolares")
        res = conn.getresponse()
        data = res.read()
        data_json = json.loads(data.decode("utf-8"))

        if isinstance(data_json, list):
            result = []
            for name in names:
                item = next((item for item in data_json if item.get('casa', '').lower() == name.lower()), None)
                if item is not None:
                    result.append(item)
                    logger.info(f'Dollar Item for {name}: {item}')
                else:
                    logger.warning(f"Dollar type '{name}' not found")
            if not result:
                raise HTTPException(status_code=404, detail="No matching dollar types found")
            return result
        else:
            raise HTTPException(status_code=500, detail="Unexpected data format in the response")
    except HTTPException as e:
        raise e
    except (ValueError, KeyError) as e:
        raise HTTPException(status_code=500, detail=f"There is an error trying to parse DolarApi response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
