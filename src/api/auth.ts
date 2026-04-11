const API_URL = "http://localhost:8000/auth";

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.detail || `Error ${res.status}`);
    return json;
  } catch {
    if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);
    return text;
  }
}

export const register = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Register error:", err);
    throw err;
  }
};

export const login = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Login error:", err);
    throw err;
  }
};

export const googleLogin = async (id_token: string) => {
  try {
    const res = await fetch(`${API_URL}/login/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token }),
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Google login error:", err);
    throw err;
  }
};

export const appleLogin = async (id_token: string) => {
  try {
    const res = await fetch(`${API_URL}/login/apple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token }),
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Apple login error:", err);
    throw err;
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Verify error:", err);
    throw err;
  }
};
