import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";
import HabitCard from "./HabitCard";
import { HabitBoardProps } from "./types/HabitBoard.types";

export default function HabitBoard({
  habits,
  isLoading,
  onAddHabit,
  onCheckIn,
  onEditHabit,
  onArchiveHabit,
}: HabitBoardProps) {
  const completedCount = habits.filter((h) => h.isCompletedToday).length;

  return (
    <View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Habit Board</Text>
          <Text style={styles.sectionSubtitle}>
            {completedCount}/{habits.length} Completed
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddHabit}>
          <AntDesign name="plus" size={20} color={theme.colors.white} />
          <Text style={styles.addButtonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>

      {habits.map((habit) => (
        <View key={habit.id} style={styles.scrollItem}>
          <HabitCard
            title={habit.title}
            xpReward={habit.xpReward}
            isCompletedToday={habit.isCompletedToday}
            onCheckIn={() => onCheckIn(habit.id, habit.xpReward)}
            onEdit={() => onEditHabit(habit)}
            onArchive={() => onArchiveHabit(habit.id)}
          />
        </View>
      ))}

      {habits.length === 0 && !isLoading && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No active habits. Click "Add Habit" to begin your journey!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.text,
  },
  sectionSubtitle: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.accent,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  addButtonText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.white,
  },
  scrollItem: {
    marginBottom: theme.spacing.sm,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: "center",
    marginTop: theme.spacing.xl,
  },
  emptyStateText: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
