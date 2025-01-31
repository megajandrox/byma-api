# BYMA API

![GitHub](https://img.shields.io/github/license/megajandrox/byma-api) ![GitHub last commit](https://img.shields.io/github/last-commit/megajandrox/byma-api) ![GitHub repo size](https://img.shields.io/github/repo-size/megajandrox/byma-api)

A FastAPI-based application to interact with the BYMA (Bolsas y Mercados Argentinos) API. This project provides an easy-to-use interface to fetch financial data such as CEDEARs, stocks, and other market-related information.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Fetch CEDEARs Data**: Retrieve up-to-date CEDEARs information from BYMA.
- **Caching Mechanism**: Efficiently cache API responses to reduce redundant requests.
- **FastAPI Backend**: Built with FastAPI for high performance and scalability.
- **Easy to Use**: Simple and intuitive API endpoints for developers.

---

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Python 3.8 or higher
- Pip (Python package manager)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/megajandrox/byma-api.git
   cd byma-api
   ```
2. **Set up a virtual environment (optional but recommended)**:
    ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
3. ***Install dependencies***:
    ```bash
   pip install -r requirements.txt
    ```
4. ***Set up environment variables***:
    Create a .env file in the root directory and add any required environment variables (e.g., API keys, cache configurations).
   ```bash
    python -m venv
   ```
5. ***Run the application***:
    ```bash
   uvicorn main:app --reload
    ```
6. ***Access the API:***
Open your browser or use a tool like curl or Postman to interact with the API at 
http://127.0.0.1:8000.
