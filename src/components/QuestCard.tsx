import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";
import Button from "./Button";
import Card from "./Card";

interface QuestCardProps {
  title: string;
  xpReward: number;
  onComplete: () => void;
  onSkip: () => void;
  completeButtonDisabled?: boolean;
  isSkipped?: boolean;
}

export default function QuestCard({
  title,
  xpReward,
  onComplete,
  onSkip,
  completeButtonDisabled,
  isSkipped,
}: QuestCardProps) {
  return (
    <Card style={[styles.container, isSkipped ? styles.skippedContainer : undefined]}>
      <View style={styles.header}>
        <Text style={styles.questType}>DAILY QUEST</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpReward}>+{xpReward} XP</Text>
        </View>
      </View>
      <Text style={[styles.title, isSkipped ? styles.skippedTitle : undefined]}>{title}</Text>
      <View style={styles.actions}>
        <Button
          title="COMPLETE"
          size="sm"
          onPress={onComplete}
          style={styles.completeButton}
          disabled={completeButtonDisabled || isSkipped}
        />
        <Button
          title="SKIP"
          variant="ghost"
          size="sm"
          onPress={onSkip}
          textStyle={styles.skipButtonText}
          disabled={isSkipped}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
  },
  skippedContainer: {
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  questType: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.primary,
    letterSpacing: 1.5,
  },
  xpBadge: {
    backgroundColor: "#4CAF5022",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  xpReward: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.success,
  },
  title: {
    fontFamily: theme.typography.fonts.semiBold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  skippedTitle: {
    textDecorationLine: "line-through",
    color: theme.colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.spacing.sm,
  },
  completeButton: {
    paddingHorizontal: theme.spacing.md,
  },
  skipButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.small,
  },
});
