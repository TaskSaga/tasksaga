export type MentorArchetype = "Mage" | "Warrior" | "Cowboy";
export type MentorState =
  | "idle"
  | "encouraging"
  | "disappointed"
  | "celebrating"
  | "thinking";

export interface MentorProfileProps {
  name: string;
  archetype: MentorArchetype;
  state: MentorState;
}
