import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

interface LevelIndicatorProps {
  level: number;
  xp: number;
  maxXp: number;
}

export default function LevelIndicator({
  level,
  xp,
  maxXp,
}: LevelIndicatorProps) {
  const progress = Math.min(xp / maxXp, 1);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.levelLabel}>LEVEL</Text>
        <Text style={styles.levelValue}>{level}</Text>
      </View>
      <View style={styles.progressBackground}>
        <View
          style={[styles.progressForeground, { width: `${progress * 100}%` }]}
        />
      </View>
      <Text style={styles.xpText}>
        {xp} / {maxXp} XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  levelLabel: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
    marginRight: 6,
  },
  levelValue: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.text,
  },
  progressBackground: {
    height: 6,
    backgroundColor: theme.colors.card,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressForeground: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  xpText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
    textAlign: "right",
    marginTop: 2,
  },
});
