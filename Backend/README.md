# Loan Risk Predictor - FastAPI Backend 

This is the robust Python-based backend for the **Loan Risk Predictor** application. Built using **FastAPI**, it serves predictions from a trained **XGBoost** classification model, handles preprocessing pipelines, and provides model interpretability via **SHAP**.

---

##  Project Directory Structure

```text
Backend/
│
├── .venv/                      # Python virtual environment
├── Datasets/                   # Raw and cleaned CSV datasets
│   ├── credit_risk_dataset.csv
│   └── credit_risk_dataset_cleaned.csv
│
├── Notebooks/                  # Jupyter notebooks for data science workflow
│   ├── Cleaning.ipynb
│   ├── EDA.ipynb
│   └── Features and Pipelines.ipynb
│
├── src/                        # Core source modules & helper scripts
│   ├── Data_cleaning.py
│   └── Model_evaluation.py
│
├── Best_Threshold.pkl          # Serialized optimal classification threshold
├── Loan_risk_Predictor.pkl     # Trained XGBoost model and preprocessing pipeline
├── Main.py                     # FastAPI application entry point & route definitions
├── requirements.txt            # Project Python dependencies
└── README.md                   # Backend documentation
```

---

##  Tech Stack & Libraries

* **Framework:** FastAPI, Uvicorn
* **Machine Learning:** XGBoost, Scikit-Learn
* **Data Processing:** Pandas, NumPy
* **Explainability:** SHAP
* **Serialization:** Pickle / Joblib

---

##  Getting Started Locally

### Prerequisites
* Python 3.8 or higher
* Pip & Virtualenv

### 1. Set Up the Virtual Environment
Navigate to the `Backend` directory and activate your virtual environment:
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 2. Install Dependencies
Install all required Python packages listed in `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 3. Run the FastAPI Server
Start the development server using Uvicorn:
```bash
python Main.py
# Alternatively:
uvicorn Main:app --reload --host 0.0.0.0 --port 8000
```

The API will now be running locally at `http://127.0.0.1:8000`.

---

##  API Documentation & Testing
Once the server is running, you can access the interactive Swagger documentation built automatically by FastAPI:
* **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **ReDoc Alternative:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

##  Core Components

* **`Main.py`**: Initializes the FastAPI app, loads `Loan_risk_Predictor.pkl` and `Best_Threshold.pkl` upon startup, and handles CORS configurations and incoming prediction requests.
* **`src/`**: Contains modularized scripts for data cleaning workflows and model performance metric evaluations.
* **`Notebooks/`**: Houses the experimental Jupyter notebooks used during exploratory data analysis (EDA), feature engineering, and model training.

## Deployed backend link 
`https://loan-risk-predictor-8kve.onrender.com`