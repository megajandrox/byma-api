from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base

from parameters import DATABASE_URL

# Create the engine
def get_engine():
    engine = create_engine(DATABASE_URL, echo=True)
    return engine

# Create a base class for declarative models
Base = declarative_base()

class InvestingModel(Base):
    __tablename__ = "investing"
    id = Column(Integer, primary_key=True)
    symbol = Column(String)
    initial_date = Column(DateTime)
    amount = Column(Float)
    initial_price = Column(Float)
    qty = Column(Integer)


# Create the table in the database
def create_table():
    engine = get_engine()
    Base.metadata.create_all(engine)
