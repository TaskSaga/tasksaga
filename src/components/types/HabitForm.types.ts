import { Habit } from "../../api/habit";
import { Boss } from "../../api/boss";

export interface HabitFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    xpReward?: number;
    bossId?: number;
  }) => void;
  initialData?: Habit;
  bosses?: Boss[];
  isSubmitting?: boolean;
}
