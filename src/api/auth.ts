import { getToken } from "../auth/storage";
import { AuthResponse } from "./auth.types";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.194:8000/auth";

async function handleResponse(res: Response): Promise<AuthResponse> {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.detail || `Error ${res.status}`);
    return json;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Error")) throw err;
    if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);
    return { detail: text };
  }
}

export const getProfile = async () => {
  const token = await getToken();
  try {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  } catch (err) {
    console.log("Get profile error:", err);
    throw err;
  }
};

export const register = async (data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
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

export const login = async (data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
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

export const googleLogin = async (id_token: string): Promise<AuthResponse> => {
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

export const appleLogin = async (id_token: string): Promise<AuthResponse> => {
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

export const verifyEmail = async (data: {
  email: string;
  code: string;
}): Promise<AuthResponse> => {
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
