export interface AdaptiveLayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
  onViewProfile: () => void;
  children: React.ReactNode;
  // User profile data for Sidebar
  username: string;
  rank: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  questsCompleted: number;
}
