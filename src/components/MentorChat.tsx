import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MentorProfile from "./MentorProfile";
import { theme } from "../theme";

interface MentorChatProps {
  message: string;
  isLoading?: boolean;
}

export default function MentorChat({ message, isLoading }: MentorChatProps) {
  return (
    <View style={styles.mentorSection}>
      <MentorProfile
        name="Merlin"
        archetype="Mage"
        state={isLoading ? "thinking" : "idle"}
      />
      <View style={styles.messageBubble}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.accent} />
            <Text style={styles.loadingText}>Consulting the stars...</Text>
          </View>
        ) : (
          <Text style={styles.messageText}>{message}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mentorSection: {
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: "#ffffff05",
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xl,
    marginTop: -theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 60,
    justifyContent: "center",
  },
  messageText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    lineHeight: 24,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  loadingText: {
    fontFamily: theme.typography.fonts.italic,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
  },
});
