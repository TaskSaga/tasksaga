import { getToken } from "../auth/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL
  ? process.env.EXPO_PUBLIC_API_URL.replace(/\/auth$/, "")
  : "http://192.168.1.194:8000";
const API_URL = `${BASE_URL}/ai`;

export interface MentorAdviceResponse {
  advice: string;
}

export interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

export interface MentorChatResponse {
  response: string;
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

export const mentorChat = async (
  message: string,
  history: ChatMessage[],
): Promise<MentorChatResponse> => {
  const token = await getToken();
  try {
    const res = await fetch(`${API_URL}/mentor/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Mentor chat error:", err);
    throw err;
  }
};
