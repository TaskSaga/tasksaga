export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export interface AchievementMetadata {
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  hint: string;
  secret?: boolean;
}

export interface ClientAchievement extends AchievementMetadata {
  id: number | string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export const ACHIEVEMENTS_METADATA: Record<string, AchievementMetadata> = {
  "First Steps": {
    name: "First Steps",
    description: "Complete your very first habit log successfully.",
    icon: "🌱",
    rarity: "common",
    hint: "Complete 1 habit check-in.",
  },
  "Habit Knight": {
    name: "Habit Knight",
    description: "Build consistency by keeping your streak alive.",
    icon: "🛡️",
    rarity: "rare",
    hint: "Maintain a 3-day active streak.",
  },
  "Early Bird": {
    name: "Early Bird",
    description: "Rise and shine! Complete a task at the start of your day.",
    icon: "🌅",
    rarity: "epic",
    hint: "Check in a habit before 9:00 AM.",
    secret: true,
  },
  "Night Owl": {
    name: "Night Owl",
    description: "Burning the midnight oil. Sleep is for the weak!",
    icon: "🦉",
    rarity: "epic",
    hint: "Check in a habit after 10:00 PM.",
    secret: true,
  },
  "Habit Master": {
    name: "Habit Master",
    description: "You have proven your dedication to the ultimate daily grind.",
    icon: "🏆",
    rarity: "legendary",
    hint: "Complete 10 habit logs total.",
  },
  "Saga Solver": {
    name: "Saga Solver",
    description:
      "Reach level milestones in your epic quest of self-improvement.",
    icon: "👑",
    rarity: "legendary",
    hint: "Reach Level 10.",
  },
};
