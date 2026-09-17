export async function apiRequest(url, options = {}) {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`http://127.0.0.1:3001${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!response.ok) {
   
    const errorData = await response.json().catch(() => ({}));

    const error = new Error("Api Request Failed");
    error.errors = errorData.errors || [];   
    error.status = response.status;         

    throw error;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}