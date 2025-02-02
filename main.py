import urllib3
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware

from dtos.dtos import InvestmentCreate, SummaryInvestment, InvestmentUpdate
from parameters import DATABASE_URL
from services.cedears import get_cedears_data
from services.market import get_market_status
from daos.investing_daos import InvestingDAO
from services.investing import InvestingService

engine = create_engine(DATABASE_URL, echo=True)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Initialize DAO and Service
investing_dao = InvestingDAO(engine)
investing_service = InvestingService(investing_dao)

# Create the FastAPI app
app = FastAPI()
origins = [
    "http://localhost:3000"
]
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/byma-api/cedears")
def get_cedears():
    data = get_cedears_data()
    return data

@app.get("/byma-api/market_status")
def check_market_is_open():
    result = get_market_status()
    return result

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

@app.get("/byma-api/summary_investments/")
def get_summary_investments():
    """Retrieve all investments."""
    cedears = get_cedears_data()
    investments = investing_service.get_all_investments()
    summary_investments = []
    total_investment = 0.0
    for investment in investments:
        total_investment = total_investment + investment.amount
        cedear = next((inv for inv in cedears if inv["symbol"] == investment.symbol), None)
        if cedear:
            summary_investment = SummaryInvestment( investment_id= investment.id,
                                                    symbol=investment.symbol,
                                                    initial_date=investment.initial_date,
                                                    amount=investment.amount,
                                                    initial_price=investment.initial_price,
                                                    qty=investment.qty,
                                                    current_price=cedear["trade"],
                                                    revenue=(cedear["trade"] * investment.qty) - investment.amount)
            summary_investments.append(summary_investment)
    for summary_investment in summary_investments:
        summary_investment.set_porc_invested((summary_investment.amount / total_investment) * 100)
    return summary_investments

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
        return {"message": "Investment updated successfully", "investment_id": updated_investment}
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