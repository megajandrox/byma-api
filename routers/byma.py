from fastapi import APIRouter
from services.market import get_market_status

router = APIRouter()

@router.get("/market_status")
def check_market_is_open():
    result = get_market_status()
    return result
