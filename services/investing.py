from datetime import datetime


class InvestingService:
    def __init__(self, investing_dao):
        self.investing_dao = investing_dao

    def create_investment(self, symbol, initial_date, amount, initial_price, qty):
        """Create a new investment."""
        investment_id = self.investing_dao.create_investment(symbol, initial_date, amount, initial_price, qty)
        return investment_id

    def bulk_create_investments(self, investments):
        """Create multiple new investments in a single transaction."""
        self.investing_dao.bulk_create_investment(investments)
        return len(investments)

    def get_investment_by_id(self, investment_id):
        """Retrieve an investment by its ID."""
        return self.investing_dao.get_investment_by_id(investment_id)

    def get_all_investments(self):
        """Retrieve all investments."""
        return self.investing_dao.get_all_investments()

    def update_investment(self, investment_id, symbol=None, initial_date=None, amount=None, initial_price=None, qty=None):
        """Update an investment's details."""
        return self.investing_dao.update_investment(investment_id, symbol, initial_date, amount, initial_price, qty)

    def delete_investment(self, investment_id):
        """Delete an investment by its ID."""
        return self.investing_dao.delete_investment(investment_id)