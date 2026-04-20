import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
  },
  levelLabel: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 12,
    color: "#666",
    marginRight: 6,
  },
  levelValue: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 24,
    color: "#333",
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressForeground: {
    height: "100%",
    backgroundColor: "#3F51B5", // Default Mage color
    borderRadius: 4,
  },
  xpText: {
    fontFamily: "TaskSaga-Regular",
    fontSize: 10,
    color: "#999",
    textAlign: "right",
    marginTop: 2,
  },
});
