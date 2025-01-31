from datetime import datetime  # Fix: Import datetime correctly
from typing import Optional

import urllib3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

from services.cedears import get_cedears_data
from services.market import get_market_status
from investing.daos import InvestingDAO
from services.investing import InvestingService
DATABASE_URL = "sqlite:///investing2.db"
engine = create_engine(DATABASE_URL, echo=True)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Initialize DAO and Service
investing_dao = InvestingDAO(engine)
investing_service = InvestingService(investing_dao)

# Define Pydantic models for request/response validation
class InvestmentCreate(BaseModel):
    symbol: str
    initial_date: datetime  # Fix: Use datetime.datetime
    amount: float
    initial_price: float
    qty: int

class InvestmentUpdate(BaseModel):
    symbol: Optional[str] = None
    initial_date: Optional[datetime] = None  # Fix: Use datetime.datetime
    amount: Optional[float] = None
    initial_price: Optional[float] = None
    qty: Optional[int] = None

# Create the FastAPI app
app = FastAPI()

# Define endpoints
@app.get("/byma-api/cedears")
def get_cedears():
    data = get_cedears_data()
    return data

@app.get("/byma-api/market_status")
def check_market_is_open():
    result = get_market_status()
    return result
# Define endpoints
@app.post("/byma-api/investments/")
def create_investment(investment: InvestmentCreate):
    """Create a new investment."""
    try:
        new_investment = investing_service.create_investment(
            symbol=investment.symbol,
            initial_date=investment.initial_date,
            amount=investment.amount,
            initial_price=investment.initial_price,
            qty=investment.qty
        )
        return {"message": "Investment created successfully", "investment_id": new_investment}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/byma-api/investments/{investment_id}")
def get_investment(investment_id: int):
    """Retrieve an investment by its ID."""
    investment = investing_service.get_investment_by_id(investment_id)
    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")
    return investment

@app.get("/byma-api/investments/")
def get_all_investments():
    """Retrieve all investments."""
    investments = investing_service.get_all_investments()
    return investments

@app.put("/byma-api/investments/{investment_id}")
def update_investment(investment_id: int, investment: InvestmentUpdate):
    """Update an investment's details."""
    try:
        updated_investment = investing_service.update_investment(
            investment_id=investment_id,
            symbol=investment.symbol,
            initial_date=investment.initial_date,
            amount=investment.amount,
            initial_price=investment.initial_price,
            qty=investment.qty
        )
        if not updated_investment:
            raise HTTPException(status_code=404, detail="Investment not found")
        return {"message": "Investment updated successfully", "investment_id": updated_investment.id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/byma-api/investments/{investment_id}")
def delete_investment(investment_id: int):
    """Delete an investment by its ID."""
    deleted = investing_service.delete_investment(investment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Investment not found")
    return {"message": "Investment deleted successfully"}

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)