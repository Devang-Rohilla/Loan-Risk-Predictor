// All backend communication lives here. Change BASE_URL if your API runs elsewhere.
export const BASE_URL = "https://loan-risk-predictor-8kve.onrender.com";

export class ApiError extends Error {
  constructor(message, { detail = "", fieldErrors = {} } = {}) {
    super(message);
    this.detail = detail;          // optional secondary message
    this.fieldErrors = fieldErrors; // { field_name: "message" } from FastAPI 422 responses
  }
}

export async function predictLoanRisk(formData) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new ApiError("Unable to connect to the prediction server.", {
      detail: `Make sure the FastAPI backend is running on ${BASE_URL}.`,
    });
  }

  if (response.status === 422) {
    // Pydantic format: { detail: [{ loc: ["body", "person_age"], msg: "..." }] }
    let body = null;
    try { body = await response.json(); } catch { /* ignore */ }
    const fieldErrors = {};
    if (Array.isArray(body?.detail)) {
      for (const item of body.detail) {
        const field = Array.isArray(item.loc) ? item.loc[item.loc.length - 1] : null;
        if (typeof field === "string" && !(field in fieldErrors)) fieldErrors[field] = item.msg;
      }
    }
    throw new ApiError("Please check the highlighted fields.", { fieldErrors });
  }
  if (!response.ok) {
    throw new ApiError("The prediction server ran into a problem.", { detail: "Please try again in a moment." });
  }

  let result;
  try { result = await response.json(); } catch { result = null; }
  if (!result || typeof result.default_probability !== "number" || typeof result.Result !== "string") {
    throw new ApiError("The server sent an unexpected response.", { detail: "Please try again in a moment." });
  }
  return result;
}

export async function checkServer() {
  try { return (await fetch(`${BASE_URL}/`)).ok; } catch { return false; }
}
