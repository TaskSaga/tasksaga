import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import Button from "./Button";
import Card from "./Card";
import { AntDesign } from "@expo/vector-icons";
import { HabitCardProps } from "./types/HabitCard.types";

export default function HabitCard({
  title,
  xpReward,
  isCompletedToday,
  onCheckIn,
  onEdit,
  onArchive,
}: HabitCardProps) {
  return (
    <Card style={[styles.container, isCompletedToday && styles.completedCard]}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Text style={styles.habitType}>DAILY HABIT</Text>
          {isCompletedToday && (
            <AntDesign
              name="check-circle"
              size={14}
              color={theme.colors.success}
              style={styles.checkIcon}
            />
          )}
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpReward}>+{xpReward} XP</Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <Text
          style={[styles.title, isCompletedToday && styles.completedTitle]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.menuActions}>
          <TouchableOpacity onPress={onEdit} hitSlop={10}>
            <AntDesign
              name="edit"
              size={18}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onArchive} hitSlop={10}>
            <AntDesign
              name="delete"
              size={18}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title={isCompletedToday ? "COMPLETED" : "CHECK IN"}
          size="sm"
          onPress={onCheckIn}
          style={[
            styles.checkInButton,
            isCompletedToday && styles.completedButton,
          ]}
          disabled={isCompletedToday}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
  },
  completedCard: {
    opacity: 0.8,
    borderColor: theme.colors.success + "44",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitType: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.primary,
    letterSpacing: 1.5,
  },
  checkIcon: {
    marginLeft: theme.spacing.xs,
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
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontFamily: theme.typography.fonts.semiBold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: theme.colors.textSecondary,
  },
  menuActions: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  checkInButton: {
    paddingHorizontal: theme.spacing.lg,
  },
  completedButton: {
    backgroundColor: theme.colors.success + "22",
  },
});
