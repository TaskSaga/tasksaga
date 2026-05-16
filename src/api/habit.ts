import { getToken } from "../auth/storage";

const API_URL = "http://192.168.1.194:8000/habit";

export interface Habit {
  id: number;
  title: string;
  description?: string;
  xpReward: number;
  isArchived: boolean;
  isCompletedToday: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

async function getAuthHeaders() {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
    return json;
  } catch (err) {
    if (err instanceof Error && !text.startsWith("{")) throw err;
    if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);
    return text;
  }
}

export const getHabits = async (): Promise<Habit[]> => {
  const res = await fetch(API_URL, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const createHabit = async (data: {
  title: string;
  description?: string;
  xpReward?: number;
}): Promise<Habit> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateHabit = async (
  id: number,
  data: Partial<Habit>,
): Promise<Habit> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteHabit = async (id: number): Promise<Habit> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const checkInHabit = async (id: number): Promise<any> => {
  const res = await fetch(`${API_URL}/${id}/check-in`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};
