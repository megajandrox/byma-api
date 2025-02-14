from sqlalchemy.orm import Session
from investing.model import InvestingModel  # Import your SQLAlchemy model

class InvestingDAO:
    def __init__(self, engine):
        self.engine = engine

    def bulk_create_investment(self, investments):
        with Session(self.engine) as session:
            try:
                # Convert Pydantic models to SQLAlchemy models
                db_investments = [
                    InvestingModel(
                        symbol=inv.symbol,
                        initial_date=inv.initial_date,
                        amount=inv.amount,
                        initial_price=inv.initial_price,
                        qty=inv.qty
                    ) for inv in investments
                ]
                session.add_all(db_investments)
                session.commit()
            except Exception as e:
                session.rollback()
                raise e

    def create_investment(self, symbol, initial_date, amount, initial_price, qty):
        """Create a new investment."""
        session = self.Session()
        try:
            new_investment = InvestingModel(
                symbol=symbol,
                initial_date=initial_date,
                amount=amount,
                initial_price=initial_price,
                qty=qty
            )
            session.add(new_investment)
            session.commit()
            # Refresh the instance to ensure the ID is populated
            session.refresh(new_investment)
            # Return the ID or the entire object
            return new_investment.id  # Return only the ID
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_investment_by_id(self, investment_id):
        """Retrieve an investment by its ID."""
        session = self.Session()
        try:
            return session.query(InvestingModel).filter(InvestingModel.id == investment_id).first()
        finally:
            session.close()

    def get_all_investments(self):
        """Retrieve all investments."""
        session = self.Session()
        try:
            return session.query(InvestingModel).all()
        finally:
            session.close()

    def update_investment(self, investment_id, symbol=None, initial_date=None, amount=None, initial_price=None, qty=None):
        """Update an investment's details."""
        session = self.Session()
        try:
            investment = session.query(InvestingModel).filter(InvestingModel.id == investment_id).first()
            if investment:
                if symbol:
                    investment.symbol = symbol
                if initial_date:
                    investment.initial_date = initial_date
                if amount:
                    investment.amount = amount
                if initial_price:
                    investment.initial_price = initial_price
                if qty:
                    investment.qty = qty
                session.commit()
                session.refresh(investment)
            return investment
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def delete_investment(self, investment_id):
        """Delete an investment by its ID."""
        session = self.Session()
        try:
            investment = session.query(InvestingModel).filter(InvestingModel.id == investment_id).first()
            if investment:
                session.delete(investment)
                session.commit()
                session.refresh(investment)
                return True
            return False
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
