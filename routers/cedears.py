from fastapi import APIRouter
from services.cedears import get_cedears_data

router = APIRouter()

@router.get("/cedears")
def get_cedears():
    data = get_cedears_data()
    return data
