from sqlalchemy import create_engine
from parameters import DATABASE_URL

engine = create_engine(DATABASE_URL, echo=True)