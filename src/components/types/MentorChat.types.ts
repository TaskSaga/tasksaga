import { ChatMessage } from "../../api/ai";
import { MentorState } from "../types/MentorProfile.types";

export interface MentorChatProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  state?: MentorState;
}
