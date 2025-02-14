from datetime import datetime  # Fix: Import datetime correctly
from typing import Optional
from pydantic import BaseModel
from typing_extensions import List


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

class SummaryInvestment:
    def __init__(self ,investment_id, symbol, initial_date, amount, initial_price, qty, current_price, revenue):
        self.investment_id = investment_id
        self.symbol = symbol
        self.initial_date = initial_date
        self.amount = amount
        self.initial_price = initial_price
        self.qty = qty
        self.current_price = current_price
        self.revenue = revenue
        self.porc_invested = 0.0

    def set_porc_invested(self, value) :
        self.porc_invested = value

