import { getToken } from "../auth/storage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.194:8000/ai";

export interface MentorAdviceResponse {
  advice: string;
}

export const getMentorAdvice = async (): Promise<MentorAdviceResponse> => {
  const token = await getToken();
  try {
    const res = await fetch(`${API_URL}/mentor/advice`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error("Get mentor advice error:", err);
    throw err;
  }
};
