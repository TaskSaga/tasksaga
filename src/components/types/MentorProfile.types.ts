type MentorArchetype = "Mage" | "Warrior" | "Cowboy";
type MentorState = "idle" | "encouraging" | "disappointed" | "celebrating";

export interface MentorProfileProps {
  name: string;
  archetype: MentorArchetype;
  state: MentorState;
}
