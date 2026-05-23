import { Quest } from "../../api/quest";

export interface QuestBoardProps {
  quests: Quest[];
  isLoading: boolean;
  onAddQuest: () => void;
  onCompleteQuest: (id: number) => void;
  onDeleteQuest: (id: number) => void;
}
