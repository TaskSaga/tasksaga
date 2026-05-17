export interface HabitCardProps {
  title: string;
  xpReward: number;
  isCompletedToday: boolean;
  onCheckIn: () => void;
  onEdit: () => void;
  onArchive: () => void;
}
