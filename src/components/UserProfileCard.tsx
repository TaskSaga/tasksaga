import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";
import LevelIndicator from "./LevelIndicator";
import Card from "./Card";

interface UserProfileCardProps {
  username: string;
  rank: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  questsCompleted: number;
}

export default function UserProfileCard({
  username,
  rank,
  level,
  xp,
  maxXp,
  streak,
  questsCompleted,
}: UserProfileCardProps) {
  return (
    <Card style={styles.container}>
      {/* Top Section: Avatar & Info */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🤠</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.rank}>{rank}</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>{streak} 🔥</Text>
        </View>
      </View>

      {/* Middle Section: Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{questsCompleted}</Text>
          <Text style={styles.statLabel}>Quests Done</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>Current Level</Text>
        </View>
      </View>

      {/* Bottom Section: XP Bar */}
      <View style={styles.levelWrapper}>
        <LevelIndicator level={level} xp={xp} maxXp={maxXp} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  rank: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.accent,
    letterSpacing: 1,
  },
  streakBadge: {
    backgroundColor: "#FF980022",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  streakText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.warning,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  statLabel: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
    textTransform: "uppercase",
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  levelWrapper: {
    marginHorizontal: -theme.spacing.md,
  },
});
