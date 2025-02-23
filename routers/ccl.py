import json
from fastapi import APIRouter, HTTPException
from datetime import datetime
from connection import get_connection
from logger.api_logger import logger

# Create the FastAPI app
router = APIRouter()

@router.get("/ccl")
async def get_ccl():
    today = datetime.now()
    day = today.weekday()  # 0 = Monday, 1 = Tuesday, ..., 6 = Sunday

    if 0 <= day <= 4:  # Only execute on weekdays (Monday-Friday)
        url = '/vanoms-be-core/rest/api/bymadata/free/getBymaIndexsMep'

        payload = json.dumps({"page_number": 1, "Content-Type": "application/json"})
        headers = {
            'Content-Type': 'application/json',
            'muteHttpExceptions': 'true'
        }

        conn = get_connection()
        try:
            conn.request("POST", url, payload, headers)
            response = conn.getresponse()

            logger.info(f'Response Code: {response.status}')
            response_text = response.read().decode('utf-8')
            logger.info(f'Response Text: {response_text}')

            data = json.loads(response_text)

            if isinstance(data.get('data'), list) and len(data['data']) > 1:
                item = data['data'][1]
                ccl_price = item.get('price')

                if ccl_price is not None:
                    logger.info(f'CCL Price: {ccl_price}')
                    return {"ccl_price": ccl_price}
                else:
                    raise HTTPException(status_code=500, detail="CCL price not found in the response")
            else:
                raise HTTPException(status_code=500, detail="Unexpected data format in the response")

        except Exception as e:
            logger.error(f'Error executing request: {str(e)}')
            raise HTTPException(status_code=500, detail=f"Error fetching CCL data: {str(e)}")

        finally:
            if conn:
                conn.close()

    else:
        logger.info('Today is not a business day, function not executed.')
        raise HTTPException(status_code=400, detail="Today is not a business day")