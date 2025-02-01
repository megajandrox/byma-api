import unittest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from daos.investing_daos import InvestingDAO
from investing.model import Base


class TestInvestingDAO(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:')
        self.Session = sessionmaker(bind=self.engine)
        self.dao = InvestingDAO(self.engine)
        Base.metadata.create_all(self.engine)

    def test_create_investment(self):
        from datetime import datetime

        # Prepare test data
        symbol = "TEST"
        initial_date = datetime.now()
        amount = 1000.0
        initial_price = 50.0
        qty = 20

        # Call the method
        investment_id = self.dao.create_investment(symbol, initial_date, amount, initial_price, qty)

        # Assert that an ID was returned
        self.assertIsNotNone(investment_id)

        # Retrieve the created investment
        created_investment = self.dao.get_investment_by_id(investment_id)

        # Assert that the investment was created with correct data
        self.assertIsNotNone(created_investment)
        self.assertEqual(created_investment.symbol, symbol)
        self.assertEqual(created_investment.initial_date, initial_date)
        self.assertEqual(created_investment.amount, amount)
        self.assertEqual(created_investment.initial_price, initial_price)
        self.assertEqual(created_investment.qty, qty)

if __name__ == '__main__':
    unittest.main()
