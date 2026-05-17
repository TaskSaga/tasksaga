export interface QuestCardProps {
  title: string;
  xpReward: number;
  onComplete: () => void;
  onSkip: () => void;
  completeButtonDisabled?: boolean;
  isSkipped?: boolean;
}
