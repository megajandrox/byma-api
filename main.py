import urllib3
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
import logging

from dtos.dtos import InvestmentCreate, SummaryInvestment, InvestmentUpdate, BulkInvestmentCreation, \
    SummaryInvestmentResponse
from investing.model import Base
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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()}
    )
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

@app.post("/byma-api/bulk/investments/")
async def bulk_create_investment(investments: BulkInvestmentCreation):
    """Create multiple new investments in a single transaction."""
    try:
        num_investments = investing_service.bulk_create_investments(investments.investments)
        return {"message": f"{num_investments} investments created successfully"}
    except ValueError as e:
        logger.error(f"ValueError in bulk_create_investment: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in bulk_create_investment: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")


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

@app.get("/byma-api/schema/")
def get_schema_db():
    """Retrieve all investments."""
    Base.metadata.create_all(engine)
    print("Schema has been created")
    investments = investing_service.get_all_investments()
    return investments

@app.get("/byma-api/summary_investments/")
def get_summary_investments():
    """Retrieve all investments."""
    cedears = get_cedears_data()
    investments = investing_service.get_all_investments()
    summary_investments = []
    total_invested = 0.0
    total_initial_investment = 0.0
    total_revenue = 0.0

    for investment in investments:
        total_initial_investment += investment.amount
        cedear = next((inv for inv in cedears if inv["symbol"] == investment.symbol), None)
        if cedear:
            current_value = cedear["trade"] * investment.qty
            revenue = current_value - investment.amount
            summary_investment = SummaryInvestment(
                investment_id= investment.id,
                symbol=investment.symbol,
                initial_date=investment.initial_date,
                amount=investment.amount,
                initial_price=investment.initial_price,
                qty=investment.qty,
                current_price=cedear["trade"],
                revenue=revenue)
            summary_investments.append(summary_investment)
            total_invested += current_value
            total_revenue += revenue
    for summary_investment in summary_investments:
        summary_investment.porc_invested = (summary_investment.amount / total_initial_investment) * 100
    return SummaryInvestmentResponse(
        investments=summary_investments,
        total_invested=total_invested,
        total_initial_investment=total_initial_investment,
        total_revenue=total_revenue
    )

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
    Base.metadata.create_all(engine)
    uvicorn.run(app, host="0.0.0.0", port=8000)