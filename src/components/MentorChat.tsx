import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MentorProfile from "./MentorProfile";
import { theme } from "../theme";

interface MentorChatProps {
  message: string;
}

export default function MentorChat({ message }: MentorChatProps) {
  return (
    <View style={styles.mentorSection}>
      <MentorProfile name="Merlin" archetype="Mage" state="idle" />
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{message}</Text>
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
  },
  messageText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    lineHeight: 24,
    textAlign: "center",
  },
});
