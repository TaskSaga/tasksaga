import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { theme } from "../theme";
import SidebarMenu from "./SidebarMenu";

interface AdaptiveLayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
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

export default function AdaptiveLayout({
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
  children,
  ...sidebarProps
}: AdaptiveLayoutProps) {
  const { width } = Dimensions.get("window");
  const isLargeScreen = width >= 768; // Standard threshold for tablets

  return (
    <View style={styles.container}>
      {/* For Large Screens, render persistent sidebar */}
      {isLargeScreen ? (
        <View style={styles.sidebarContainer}>
          <SidebarMenu
            isOpen={true}
            onClose={() => {}}
            onLogout={onLogout}
            {...sidebarProps}
          />
        </View>
      ) : (
        /* For Mobile, render slide-out sidebar */
        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={onLogout}
          {...sidebarProps}
        />
      )}

      {/* Main Content Area */}
      <View
        style={[styles.mainContent, isLargeScreen && styles.mainContentLarge]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.background,
  },
  sidebarContainer: {
    width: 280,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  mainContent: {
    flex: 1,
  },
  mainContentLarge: {
    // Optional: add padding or styling adjustments for large screens
  },
});
