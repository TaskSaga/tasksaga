export interface QuestCardProps {
  id: number;
  title: string;
  description?: string;
  xpReward: number;
  goldReward?: number;
  status: "AVAILABLE" | "COMPLETED" | "FAILED";
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}
