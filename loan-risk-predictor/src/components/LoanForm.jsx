import { useState } from "react";
import FormSection from "./FormSection";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { predictLoanRisk } from "../services/api";

const initial = {
  person_age: "", person_income: "", person_home_ownership: "", person_emp_length: "",
  loan_intent: "", loan_grade: "", loan_amnt: "", loan_int_rate: "", loan_percent_income: "",
  cb_person_default_on_file: "", cb_person_cred_hist_length: "",
};

// Numeric rules mirror the FastAPI/Pydantic model.
const rules = {
  person_age: { min: 18, max: 100, integer: true, msg: "Age must be between 18 and 100.", intMsg: "Age must be a whole number." },
  person_income: { min: 0, msg: "Annual income can't be negative." },
  person_emp_length: { min: 0, max: 60, msg: "Employment length must be between 0 and 60 years." },
  loan_amnt: { min: 0, msg: "Loan amount can't be negative." },
  loan_int_rate: { min: 0, msg: "Interest rate can't be negative." },
  loan_percent_income: { min: 0, max: 1, msg: "Enter a value between 0 and 1 (for example 0.25)." },
  cb_person_cred_hist_length: { min: 0, integer: true, msg: "Credit history length can't be negative.", intMsg: "Credit history length must be a whole number." },
};

// [label shown, value sent]
const choices = {
  person_home_ownership: [["Rent", "RENT"], ["Own", "OWN"], ["Mortgage", "MORTGAGE"], ["Other", "OTHER"]],
  loan_intent: [["Personal", "PERSONAL"], ["Education", "EDUCATION"], ["Medical", "MEDICAL"], ["Venture", "VENTURE"],
    ["Home Improvement", "HOMEIMPROVEMENT"], ["Debt Consolidation", "DEBTCONSOLIDATION"]],
  loan_grade: ["A", "B", "C", "D", "E", "F", "G"].map((g) => [g, g]),
  cb_person_default_on_file: [["No", "N"], ["Yes", "Y"]],
};

const pretty = (v) => Number(v).toLocaleString("en-IN");

export default function LoanForm({ onResult }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const found = {};
    for (const [name, r] of Object.entries(rules)) {
      const v = form[name];
      const n = Number(v);
      if (v === "" || Number.isNaN(n)) found[name] = "This field is required.";
      else if (r.integer && !Number.isInteger(n)) found[name] = r.intMsg;
      else if (n < r.min || (r.max !== undefined && n > r.max)) found[name] = r.msg;
    }
    for (const [name, opts] of Object.entries(choices)) {
      if (!opts.some(([, val]) => val === form[name])) found[name] = "Please select an option.";
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || !validate()) return;
    setLoading(true);
    setApiError(null);
    // Numbers are sent as numbers; dropdown values stay as the exact backend strings.
    const payload = {};
    for (const [k, v] of Object.entries(form)) payload[k] = k in rules ? Number(v) : v;
    try {
      onResult(await predictLoanRisk(payload));
    } catch (err) {
      onResult(null);
      setApiError({ title: err.message, detail: err.detail });
      if (err.fieldErrors) setErrors(err.fieldErrors); // map 422 errors to inputs
    } finally {
      setLoading(false);
    }
  };

  const num = (name, label, extra = {}) => (
    <InputField name={name} label={label} value={form[name]} onChange={handleChange} error={errors[name]} {...extra} />
  );
  const sel = (name, label, extra = {}) => (
    <SelectField name={name} label={label} value={form[name]} onChange={handleChange} error={errors[name]} options={choices[name]} {...extra} />
  );
  const pct = form.loan_percent_income !== "" && !Number.isNaN(Number(form.loan_percent_income)) && Number(form.loan_percent_income) >= 0 && Number(form.loan_percent_income) <= 1
    ? `${Number((Number(form.loan_percent_income) * 100).toFixed(1))}% of income` : "Enter a value between 0 and 1. For example, 0.25 is 25% of income.";
  const amount = (name) => (form[name] !== "" && Number(form[name]) >= 0 ? `Amount: ${pretty(form[name])}` : undefined);

  return (
    <form id="loan-form" onSubmit={handleSubmit} noValidate className="clay animate-rise p-6 sm:p-10">
      <h2 className="text-3xl font-extrabold">Loan Application</h2>
      <p className="mb-8 mt-1 text-muted">Enter applicant details to evaluate loan default risk.</p>

      <FormSection title="Personal information">
        {num("person_age", "Age", { step: 1, placeholder: "e.g. 25" })}
        {num("person_income", "Annual Income", { step: "any", placeholder: "e.g. 50000", hint: amount("person_income") })}
        {sel("person_home_ownership", "Home Ownership")}
        {num("person_emp_length", "Employment Length (years)", { step: "any", placeholder: "e.g. 3.5" })}
      </FormSection>

      <FormSection title="Loan information">
        {sel("loan_intent", "Loan Intent")}
        {sel("loan_grade", "Loan Grade")}
        {num("loan_amnt", "Loan Amount", { step: "any", placeholder: "e.g. 10000", hint: amount("loan_amnt") })}
        {num("loan_int_rate", "Interest Rate (%)", { step: "any", placeholder: "e.g. 10.5" })}
        {num("loan_percent_income", "Loan Percent Income", { step: "any", placeholder: "e.g. 0.25", hint: pct })}
      </FormSection>

      <FormSection title="Credit history">
        {sel("cb_person_default_on_file", "Previous Default", { variant: "segmented" })}
        {num("cb_person_cred_hist_length", "Credit History Length (years)", { step: 1, placeholder: "e.g. 5" })}
      </FormSection>

      {apiError && (
        <div role="alert" className="clay-inset mt-8 border-l-4 border-bad px-5 py-4">
          <p className="font-semibold text-bad">{apiError.title}</p>
          {apiError.detail && <p className="mt-1 text-sm text-muted">{apiError.detail}</p>}
        </div>
      )}

      <button type="submit" disabled={loading} aria-busy={loading} className="clay-btn mt-8 flex w-full items-center justify-center gap-3 py-4 text-lg">
        {loading && <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0D0F12]/30 border-t-[#0D0F12]" aria-hidden="true" />}
        {loading ? "Analyzing Application..." : "Analyze Loan Risk"}
      </button>
    </form>
  );
}
