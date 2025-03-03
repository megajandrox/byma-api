import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from db.engine import engine
from investing.model import Base
from logger.api_logger import logger
from routers.byma import router as byma_router
from routers.cedears import router as cedears_router
from routers.investment import router as investment_router
from routers.ccl import router as ccl_router  # Add this line
from routers.dolar_api import router as dollar_router  # Add this line

# Create the FastAPI app
app = FastAPI()
origin_localhost = os.environ.get("ORIGIN_LOCALHOST", "http://localhost:3000")
origin_production = os.environ.get("ORIGIN_PRODUCTION", None)

origins = [
    origin_localhost,
    origin_production
]

@app.on_event("startup")
async def startup_event():
    logger.info("Application is starting up...")
    logger.info(f"Routes: {[route for route in app.routes]}")

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

app.include_router(cedears_router, prefix="/byma-api")
app.include_router(byma_router, prefix="/byma-api")
app.include_router(investment_router, prefix="/byma-api")
app.include_router(ccl_router, prefix="/byma-api")
app.include_router(dollar_router, prefix="/byma-api")

# Run the application
if __name__ == "__main__":
    import uvicorn
    Base.metadata.create_all(engine)
    uvicorn.run(app, host="0.0.0.0", port=8000)