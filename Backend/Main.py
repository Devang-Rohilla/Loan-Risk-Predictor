import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel , Field
import joblib
from typing import Literal
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles


ml_model = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    ml_model['model'] = joblib.load('Loan_risk_Predictor.pkl')
    ml_model['threshold'] = joblib.load('Best_Threshold.pkl')

    yield

    ml_model.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoanApplication(BaseModel):
    person_age: int = Field(..., ge=18, le=100)
    person_income: float = Field(..., ge=0)
    person_home_ownership: Literal['RENT', 'OWN', 'MORTGAGE', 'OTHER']
    person_emp_length: float = Field(...,ge=0,le=60)
    loan_intent: Literal['PERSONAL','EDUCATION','MEDICAL','VENTURE','HOMEIMPROVEMENT','DEBTCONSOLIDATION']
    loan_grade: Literal['D', 'B', 'C', 'A', 'E', 'F', 'G']
    loan_amnt: float=Field(...,ge=0)
    loan_int_rate: float = Field(...,ge=0)
    loan_percent_income: float = Field(...,ge=0,le=1)
    cb_person_default_on_file: Literal['Y', 'N']
    cb_person_cred_hist_length: int = Field(...,ge=0)



@app.get("/")
def greet():
    return {"Greet":"Welcome to the Loan Risk Predictor"}

@app.post("/predict")
def predict (data:LoanApplication):
    input_df = pd.DataFrame([data.dict()])
    probability = ml_model['model'].predict_proba(input_df)[:, 1][0]
    prediction = int(probability >= ml_model["threshold"])
    return {
        "default_probability": probability,
        "default_prediction": prediction,
        "threshold": ml_model["threshold"],
        "Result": "High Risk" if prediction == 1 else "Low Risk"
    }
