export interface DBUserAchievement {
  userId: number;
  achievementId: number;
  unlockedAt: string;
  achievement: {
    id: number;
    name: string;
    description: string;
  };
}

export interface AchievementsModalProps {
  isVisible: boolean;
  onClose: () => void;
  unlockedAchievements?: DBUserAchievement[];
}
