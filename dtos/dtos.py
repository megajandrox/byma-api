from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

class InvestmentCreate(BaseModel):
    symbol: str
    initial_date: datetime  # Fix: Use datetime.datetime
    amount: float
    initial_price: float
    qty: int

# Define Pydantic models for request/response validation
class BulkInvestmentCreation(BaseModel):
    investments: List[InvestmentCreate]

class InvestmentUpdate(BaseModel):
    symbol: Optional[str] = None
    initial_date: Optional[datetime] = None  # Fix: Use datetime.datetime
    amount: Optional[float] = None
    initial_price: Optional[float] = None
    qty: Optional[int] = None

class SummaryInvestment(BaseModel):
    investment_id: int
    symbol: str
    initial_date: datetime
    amount: float
    initial_price: float
    qty: int
    current_price: float
    revenue: float
    porc_invested: float = 0.0

class SummaryInvestmentResponse(BaseModel):
    investments: List[SummaryInvestment]
    total_invested: float
    total_initial_investment: float
    total_revenue: float
