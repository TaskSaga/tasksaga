export interface ProfileData {
  username: string;
  level: number;
  currentXp: number;
  strength: number;
  intelligence: number;
  dexterity: number;
  spirit: number;
}

export interface ProfileScreenProps {
  navigation: {
    goBack: () => void;
  };
}
