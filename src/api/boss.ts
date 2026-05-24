import { getToken } from "../auth/storage";

const API_URL = "http://192.168.1.194:8000/boss";

export interface Boss {
  id: number;
  name: string;
  description?: string;
  maxHp: number;
  currentHp: number;
  rewardGold: number;
  rewardXp: number;
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

export const getBosses = async (): Promise<Boss[]> => {
  const res = await fetch(API_URL, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getBoss = async (id: number): Promise<Boss> => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const createBoss = async (data: Partial<Boss>): Promise<Boss> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const checkBossAttacks = async (): Promise<{
  totalDamage: number;
  checked: boolean;
}> => {
  const res = await fetch(`${API_URL}/check-attacks`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};
