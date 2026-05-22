import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import QuestCard from "./QuestCard";
import { Quest } from "../api/quest";

interface QuestBoardProps {
  quests: Quest[];
  isLoading: boolean;
  onAddQuest: () => void;
  onCompleteQuest: (id: number) => void;
  onDeleteQuest: (id: number) => void;
}

export default function QuestBoard({
  quests,
  isLoading,
  onAddQuest,
  onCompleteQuest,
  onDeleteQuest,
}: QuestBoardProps) {
  const activeQuests = quests.filter((q) => q.status !== "COMPLETED");
  const completedQuests = quests.filter((q) => q.status === "COMPLETED");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="map-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.title}>Quest Log</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddQuest}>
          <Ionicons name="add" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      {isLoading && quests.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Scouting for adventures...</Text>
        </View>
      ) : quests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No active quests. Visit the Tavern!</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={onAddQuest}>
            <Text style={styles.emptyButtonText}>Post a Bounty</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {activeQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              onComplete={onCompleteQuest}
              onDelete={onDeleteQuest}
              isLoading={isLoading}
            />
          ))}

          {completedQuests.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.completedTitle}>Completed Adventures</Text>
              {completedQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  onComplete={onCompleteQuest}
                  onDelete={onDeleteQuest}
                  isLoading={isLoading}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loadingContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  loadingText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
  },
  emptyText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  emptyButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  emptyButtonText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.primary,
  },
  completedSection: {
    marginTop: theme.spacing.md,
  },
  completedTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
