import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "./Card";
import { QuestCardProps } from "./types/QuestCard.types";

export default function QuestCard({
  id,
  title,
  description,
  xpReward,
  goldReward,
  status,
  onComplete,
  onDelete,
  isLoading,
}: QuestCardProps) {
  const isCompleted = status === "COMPLETED";

  return (
    <Card style={[styles.container, isCompleted && styles.completedContainer]}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{xpReward} XP</Text>
          </View>
          {goldReward && (
            <View style={styles.goldBadge}>
              <Text style={styles.goldText}>{goldReward}G</Text>
            </View>
          )}
        </View>
        {!isCompleted && (
          <TouchableOpacity onPress={() => onDelete(id)} disabled={isLoading}>
            <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {title}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {!isCompleted && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => onComplete(id)}
          disabled={isLoading}
        >
          <MaterialCommunityIcons name="sword" size={18} color={theme.colors.white} />
          <Text style={styles.completeButtonText}>EMBARK</Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
          <Text style={styles.completedBadgeText}>VICTORY</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: "#ffffff05",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  badgeRow: {
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  xpBadge: {
    backgroundColor: "#4CAF5022",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.success + "44",
  },
  xpText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 10,
    color: theme.colors.success,
  },
  goldBadge: {
    backgroundColor: "#FFD70022",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.accent + "44",
  },
  goldText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 10,
    color: theme.colors.accent,
  },
  content: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.colors.textSecondary,
  },
  description: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
  },
  completeButton: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  completeButtonText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.white,
    letterSpacing: 1,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  completedBadgeText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.success,
    letterSpacing: 1,
  },
});
