import { Habit } from "../../api/habit";

export interface HabitFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    xpReward?: number;
  }) => void;
  initialData?: Habit;
  isSubmitting?: boolean;
}
