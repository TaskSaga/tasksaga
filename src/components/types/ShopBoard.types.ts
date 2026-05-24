import { Item, UserItem } from "../../api/shop";

export interface ShopBoardProps {
  items: Item[];
  inventory: UserItem[];
  userGold: number;
  onPurchase: (itemId: number) => void;
  onEquip: (userItemId: number) => void;
  isLoading: boolean;
}
