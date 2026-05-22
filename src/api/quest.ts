import { getToken } from "../auth/storage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.194:8000/quests";

export interface Quest {
  id: number;
  title: string;
  description?: string;
  xpReward: number;
  goldReward: number;
  status: "AVAILABLE" | "COMPLETED" | "FAILED";
  createdAt: string;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
    return json;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Error")) throw err;
    if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);
    return text;
  }
}

export const getQuests = async (): Promise<Quest[]> => {
  const token = await getToken();
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
};

export const createQuest = async (data: Partial<Quest>): Promise<Quest> => {
  const token = await getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateQuest = async (
  id: number,
  data: Partial<Quest>,
): Promise<Quest> => {
  const token = await getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteQuest = async (id: number): Promise<void> => {
  const token = await getToken();
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
