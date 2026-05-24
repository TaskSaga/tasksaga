import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { theme } from "../theme";
import Card from "./Card";
import { Boss } from "../api/boss";

interface BossBoardProps {
  bosses: Boss[];
  isLoading: boolean;
}

export default function BossBoard({ bosses, isLoading }: BossBoardProps) {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        color={theme.colors.error}
        style={styles.loader}
      />
    );
  }

  if (bosses.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Boss Battles</Text>
      {bosses.map((boss) => (
        <Card key={boss.id} style={styles.bossCard}>
          <View style={styles.bossHeader}>
            <Text style={styles.bossName}>{boss.name}</Text>
            <Text style={styles.bossHp}>
              {boss.currentHp} / {boss.maxHp} HP
            </Text>
          </View>
          <View style={styles.hpBarContainer}>
            <View
              style={[
                styles.hpBar,
                { width: `${(boss.currentHp / boss.maxHp) * 100}%` },
              ]}
            />
          </View>
          {boss.description && (
            <Text style={styles.bossDesc}>{boss.description}</Text>
          )}
          <View style={styles.rewards}>
            <Text style={styles.rewardText}>
              Rewards: {boss.rewardGold}G, {boss.rewardXp}XP
            </Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.spacing.md },
  loader: { marginVertical: theme.spacing.md },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  bossCard: { marginBottom: theme.spacing.md, padding: theme.spacing.md },
  bossHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  bossName: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 16,
    color: theme.colors.text,
  },
  bossHp: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 14,
    color: theme.colors.error,
  },
  hpBarContainer: {
    height: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: theme.spacing.sm,
  },
  hpBar: { height: "100%", backgroundColor: theme.colors.error },
  bossDesc: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  rewards: { marginTop: theme.spacing.xs },
  rewardText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 10,
    color: theme.colors.accent,
  },
});
