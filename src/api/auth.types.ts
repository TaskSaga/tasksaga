import { DBUserAchievement } from "../components/types/AchievementsModal.types";

export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  detail?: string;
  message?: string;
  currentXp?: number;
  level?: number;
  gold?: number;
  hp?: number;
  maxHp?: number;
  strength?: number;
  intelligence?: number;
  dexterity?: number;
  spirit?: number;
  achievements?: DBUserAchievement[];
}
