import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";
import UserProfileCard from "./UserProfileCard";
import Button from "./Button";
import { SidebarMenuProps } from "./types/SidebarMenu.types";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.85;

export default function SidebarMenu({
  isOpen,
  onClose,
  onLogout,
  onViewProfile,
  username,
  rank,
  level,
  xp,
  maxXp,
  streak,
  questsCompleted,
}: SidebarMenuProps) {
  const insets = useSafeAreaInsets();
  // Start off-screen to the right by setting initial value to SIDEBAR_WIDTH
  const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SIDEBAR_WIDTH, // Slide back out to the right
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, slideAnim, fadeAnim]);

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.container]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sidebar,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Button
            title=""
            icon={
              <AntDesign
                name="close"
                size={24}
                color={theme.colors.textSecondary}
              />
            }
            variant="ghost"
            onPress={onClose}
            style={styles.closeButton}
          />
        </View>

        <View style={styles.content}>
          <UserProfileCard
            username={username}
            rank={rank}
            level={level}
            xp={xp}
            maxXp={maxXp}
            streak={streak}
            questsCompleted={questsCompleted}
          />

          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem} onPress={onViewProfile}>
              <View style={styles.menuIcon}>
                <AntDesign name="user" size={20} color={theme.colors.accent} />
              </View>
              <Text style={styles.menuText}>Character Sheet</Text>
              <AntDesign
                name="right"
                size={14}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Log Out"
            variant="outline"
            icon={
              <AntDesign name="logout" size={18} color={theme.colors.error} />
            }
            onPress={onLogout}
            textStyle={styles.logoutText}
            style={styles.logoutButton}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    elevation: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.black,
  },
  sidebar: {
    position: "absolute",
    right: 0, // Pin to the right side
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.colors.background,
    borderLeftWidth: 1, // Border on the left now
    borderLeftColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 0 }, // Shadow casts left
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start", // Push close button to the left edge of the sidebar
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
  closeButton: {
    paddingHorizontal: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  menuItems: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  menuText: {
    flex: 1,
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  logoutButton: {
    borderColor: theme.colors.error,
    backgroundColor: "#D32F2F11",
  },
  logoutText: {
    color: theme.colors.error,
  },
});
