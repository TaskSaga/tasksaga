export interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onViewProfile: () => void;
  username: string;
  rank: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  questsCompleted: number;
}
