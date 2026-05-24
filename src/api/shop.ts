import { getToken } from "../auth/storage";

const API_URL = "http://192.168.1.194:8000/shop";

export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  type: "HEAD" | "BODY" | "WEAPON";
  statBoost?: Record<string, number>;
}

export interface UserItem {
  id: number;
  userId: number;
  itemId: number;
  isEquipped: boolean;
  item: Item;
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

export const getShopItems = async (): Promise<Item[]> => {
  const res = await fetch(`${API_URL}/items`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getInventory = async (): Promise<UserItem[]> => {
  const res = await fetch(`${API_URL}/inventory`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};

export const purchaseItem = async (itemId: number): Promise<UserItem> => {
  const res = await fetch(`${API_URL}/purchase`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ itemId }),
  });
  return handleResponse(res);
};

export const equipItem = async (
  userItemId: number,
): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/equip/${userItemId}`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });
  return handleResponse(res);
};
