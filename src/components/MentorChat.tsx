import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MentorProfile from "./MentorProfile";
import { theme } from "../theme";
import { ChatMessage } from "../api/ai";
import { MentorState } from "./types/MentorProfile.types";

interface MentorChatProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  state?: MentorState;
}

export default function MentorChat({
  messages,
  isLoading,
  state = "idle",
}: MentorChatProps) {
  // We only show the last 5-10 messages as per requirements
  const displayedMessages = messages.slice(-10);

  return (
    <View style={styles.mentorSection}>
      <MentorProfile
        name="Merlin"
        archetype="Mage"
        state={isLoading ? "thinking" : state}
      />

      <View style={styles.chatContainer}>
        {displayedMessages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.role === "user" ? styles.userBubble : styles.mentorBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.role === "user" ? styles.userText : styles.mentorText,
              ]}
            >
              {msg.parts}
            </Text>
          </View>
        ))}

        {isLoading && (
          <View
            style={[
              styles.messageBubble,
              styles.mentorBubble,
              styles.loadingBubble,
            ]}
          >
            <ActivityIndicator size="small" color={theme.colors.accent} />
            <Text style={styles.loadingText}>Consulting the stars...</Text>
          </View>
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
  chatContainer: {
    width: "100%",
    paddingHorizontal: theme.spacing.xl,
    marginTop: -theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  messageBubble: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    maxWidth: "90%",
  },
  mentorBubble: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    alignSelf: "center",
  },
  userBubble: {
    backgroundColor: theme.colors.primary + "20",
    borderColor: theme.colors.primary + "40",
    alignSelf: "flex-end",
  },
  messageText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    lineHeight: 22,
  },
  mentorText: {
    color: theme.colors.text,
    textAlign: "center",
  },
  userText: {
    color: theme.colors.primary,
    textAlign: "right",
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    alignSelf: "center",
    minWidth: 200,
  },
  loadingText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
  },
});
