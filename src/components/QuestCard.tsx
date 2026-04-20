import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface QuestCardProps {
  title: string;
  xpReward: number;
  onComplete: () => void;
  onSkip: () => void;
}

export default function QuestCard({
  title,
  xpReward,
  onComplete,
  onSkip,
}: QuestCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questType}>DAILY QUEST</Text>
        <Text style={styles.xpReward}>+{xpReward} XP</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.completeButton]}
          onPress={onComplete}
        >
          <Text style={styles.buttonText}>COMPLETE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={onSkip}
        >
          <Text style={[styles.buttonText, { color: "#666" }]}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  questType: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 10,
    color: "#3F51B5",
    letterSpacing: 1,
  },
  xpReward: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 10,
    color: "#4CAF50",
  },
  title: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButton: {
    backgroundColor: "#3F51B5",
  },
  skipButton: {
    backgroundColor: "#F5F5F5",
  },
  buttonText: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
