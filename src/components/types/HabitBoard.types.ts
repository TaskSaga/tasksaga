import * as habitApi from "../../api/habit";

export interface HabitBoardProps {
  habits: habitApi.Habit[];
  isLoading: boolean;
  onAddHabit: () => void;
  onCheckIn: (habitId: number, reward: number) => void;
  onEditHabit: (habit: habitApi.Habit) => void;
  onArchiveHabit: (habitId: number) => void;
}
