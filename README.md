# Loan Risk Predictor 

A full-stack, production-ready machine learning application designed to assess loan default risk and provide transparent, interpretable model explanations. Built with an **XGBoost** classification model, **SHAP** for explainability pipelines, a **FastAPI** backend, and a modern **React & Tailwind CSS** frontend deployed on **Render**.

---

##  Features

- **Machine Learning Classification:** Powered by an XGBoost model trained to predict credit/loan default risk based on applicant financial profiles.
- **Explainable AI (XAI):** Integrated **SHAP (SHapley Additive exPlanations)** pipeline to generate instant feature contribution plots and explain *why* a particular loan decision was made.
- **Modern Responsive UI:** Built with **React** and styled using **Tailwind CSS** for a clean, intuitive, and mobile-friendly user experience.
- **Robust Backend API:** RESTful API built with Python, handling data validation, model inference, and SHAP value calculation seamlessly.
- **Cloud Deployment:** Seamlessly hosted on Render for high availability and accessibility.

---

##  Tech Stack

### **Machine Learning & Backend**
- **Python**
- **XGBoost** (Classification Model)
- **Scikit-Learn** & **Pandas** (Data preprocessing pipelines)
- **SHAP** (Model explainability)
- **FastAPI** / **Flask** (REST API framework)

### **Frontend**
- **React.js**
- **Tailwind CSS** (Styling)
- **Axios** / **Fetch API** (Backend communication)

### **Deployment & DevOps**
- **Render** (Cloud hosting platform)
- **Git & GitHub** (Version control)

---

##  Project Structure

```text
loan-risk-predictor/
│
├── backend/                  # FastAPI / Python Backend
│   ├── Datasets/                # Datasets cleaned and uncleaned
│   ├── Notebooks/             # Data preprocessing & SHAP explanation scripts
│   ├── src/             # Data cleaning and model evaluation scripts
│   ├── Main.py               # API entry point & routes
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React.js & Tailwind CSS Frontend
└── README.md                 # Project documentation
```

---

##  Getting Started Locally

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
- Python 3.8+
- Node.js & npm / yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Devang-Rohilla/Loan-Risk-Predictor.git
cd loan-risk-predictor
```

### 2. Set Up the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend API will run locally at `http://localhost:8000`.*

### 3. Set Up the Frontend
Open a new terminal window, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*The React development server will run locally (typically at `http://localhost:3000` or `http://localhost:5173`).*

---

##  Deployment

- **Backend:** Deployed as a Web Service on **Render** `https://loan-risk-predictor-8kve.onrender.com`, utilizing Gunicorn/Uvicorn to manage production ASGI workers.
- **Frontend:** Built and deployed via static site hosting or connected service integrations. `https://loan-risk-predictor-1.onrender.com`

---

##  Usage

1. Open the deployed application (or local frontend instance).
2. Enter the applicant's financial metrics and details into the form inputs.
3. Click **Predict Risk** to submit the payload to the backend API.
4. Review the risk assessment result along with **SHAP explanations** showcasing the specific factors driving the model's prediction.

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Devang-Rohilla/Loan-Risk-Predictor/issues).

---

##  License

Distributed under the MIT License. See `LICENSE` for more information.