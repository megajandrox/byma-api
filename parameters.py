import os

# 1. Get the environment variable (with a default value):
#DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///investing.db")
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://admin:admin123@postgres_db_byma_api:5432/postgres")
# Explanation:
# os.environ.get("DATABASE_URL", "sqlite:///investing.db") tries to retrieve the value of the
# environment variable named "DATABASE_URL". If the environment variable is not set, it
# returns the default value "sqlite:///investing.db".

# 2. Use the DATABASE_URL:
print(f"Using database URL: {DATABASE_URL}")
