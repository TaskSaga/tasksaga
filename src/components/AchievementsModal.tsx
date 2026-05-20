import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { theme } from "../theme";
import { AchievementsModalProps } from "./types/AchievementsModal.types";
import { ACHIEVEMENTS_METADATA, AchievementRarity } from "./types/achievements";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const RARITY_DETAILS: Record<
  AchievementRarity,
  { label: string; color: string; bg: string }
> = {
  common: { label: "COMMON", color: "#4CAF50", bg: "rgba(76, 175, 80, 0.15)" },
  rare: { label: "RARE", color: "#2196F3", bg: "rgba(33, 150, 243, 0.15)" },
  epic: { label: "EPIC", color: "#9C27B0", bg: "rgba(156, 39, 176, 0.15)" },
  legendary: {
    label: "LEGENDARY",
    color: "#FFA000",
    bg: "rgba(255, 160, 0, 0.15)",
  },
};

export default function AchievementsModal({
  isVisible,
  onClose,
  unlockedAchievements = [],
}: AchievementsModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "unlocked" | "locked">(
    "all",
  );

  // Combine static metadata with database unlocked status
  const achievementsList = Object.keys(ACHIEVEMENTS_METADATA).map((key) => {
    const meta = ACHIEVEMENTS_METADATA[key];
    const unlockedRecord = unlockedAchievements.find(
      (ua) => ua.achievement?.name === key,
    );

    return {
      ...meta,
      isUnlocked: !!unlockedRecord,
      unlockedAt: unlockedRecord ? unlockedRecord.unlockedAt : undefined,
    };
  });

  const totalCount = achievementsList.length;
  const unlockedCount = achievementsList.filter((a) => a.isUnlocked).length;
  const percentComplete = totalCount > 0 ? unlockedCount / totalCount : 0;

  // Filter achievements based on active tab
  const filteredAchievements = achievementsList.filter((a) => {
    if (activeTab === "unlocked") return a.isUnlocked;
    if (activeTab === "locked") return !a.isUnlocked;
    return true;
  });

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.outerContainer}>
        <LinearGradient
          colors={["#1d033b", "#0f0122"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Quest Log</Text>
              <Text style={styles.headerSubtitle}>Trophies & Achievements</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <AntDesign name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressPercentage}>
                {Math.round(percentComplete * 100)}% Complete
              </Text>
              <Text style={styles.progressFraction}>
                {unlockedCount} / {totalCount} Unlocked
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={[theme.colors.secondary, theme.colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.progressBarFill,
                  { width: `${percentComplete * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Tab Filter */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "all" && styles.activeTab]}
              onPress={() => setActiveTab("all")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "all" && styles.activeTabText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "unlocked" && styles.activeTab]}
              onPress={() => setActiveTab("unlocked")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "unlocked" && styles.activeTabText,
                ]}
              >
                Unlocked ({unlockedCount})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "locked" && styles.activeTab]}
              onPress={() => setActiveTab("locked")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "locked" && styles.activeTabText,
                ]}
              >
                Locked ({totalCount - unlockedCount})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Achievements List */}
          <ScrollView
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            {filteredAchievements.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="trophy-outline"
                  size={64}
                  color={theme.colors.card}
                />
                <Text style={styles.emptyText}>No achievements found here</Text>
              </View>
            ) : (
              filteredAchievements.map((achievement, idx) => {
                const rarity = RARITY_DETAILS[achievement.rarity];
                const isSecret = achievement.secret && !achievement.isUnlocked;

                return (
                  <View
                    key={idx}
                    style={[
                      styles.card,
                      achievement.isUnlocked
                        ? { borderColor: rarity.color, borderWidth: 1 }
                        : styles.cardLocked,
                    ]}
                  >
                    {/* Glowing Accent for Unlocked Items */}
                    {achievement.isUnlocked && (
                      <View
                        style={[
                          styles.cardGlowBorder,
                          { backgroundColor: rarity.color },
                        ]}
                      />
                    )}

                    {/* Badge Column */}
                    <View style={styles.badgeColumn}>
                      <View
                        style={[
                          styles.iconContainer,
                          achievement.isUnlocked
                            ? { backgroundColor: rarity.bg }
                            : styles.iconContainerLocked,
                        ]}
                      >
                        <Text style={styles.badgeEmoji}>
                          {isSecret ? "❓" : achievement.icon}
                        </Text>
                      </View>
                      {!achievement.isUnlocked && (
                        <View style={styles.lockBadge}>
                          <Ionicons
                            name="lock-closed"
                            size={12}
                            color={theme.colors.textSecondary}
                          />
                        </View>
                      )}
                    </View>

                    {/* Content Column */}
                    <View style={styles.contentColumn}>
                      <View style={styles.cardHeaderRow}>
                        <Text
                          style={[
                            styles.cardTitle,
                            isSecret && styles.cardTitleSecret,
                          ]}
                        >
                          {isSecret ? "Secret Achievement" : achievement.name}
                        </Text>
                        <View
                          style={[
                            styles.rarityBadge,
                            { backgroundColor: rarity.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.rarityBadgeText,
                              { color: rarity.color },
                            ]}
                          >
                            {rarity.label}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.cardDesc}>
                        {isSecret
                          ? "Fulfill a hidden task to unlock this trophy."
                          : achievement.description}
                      </Text>

                      <View style={styles.cardFooter}>
                        {achievement.isUnlocked ? (
                          <View style={styles.unlockedDateContainer}>
                            <Ionicons
                              name="checkmark-circle"
                              size={14}
                              color="#4CAF50"
                            />
                            <Text style={styles.unlockedDate}>
                              {" "}
                              Unlocked {formatDate(achievement.unlockedAt)}
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.hintText}>
                            Requirements: {achievement.hint}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#1d033b",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSection: {
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: theme.spacing.sm,
  },
  progressPercentage: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.accent,
  },
  progressFraction: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: theme.borderRadius.sm,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.secondary,
  },
  tabText: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.text,
    fontFamily: theme.typography.fonts.bold,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    overflow: "hidden",
    position: "relative",
  },
  cardLocked: {
    opacity: 0.65,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardGlowBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  badgeColumn: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  badgeEmoji: {
    fontSize: 28,
  },
  lockBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#2d0b5a",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  contentColumn: {
    flex: 1,
    justifyContent: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  cardTitleSecret: {
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },
  rarityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  rarityBadgeText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
  },
  cardDesc: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
    lineHeight: 16,
    marginBottom: theme.spacing.sm,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  unlockedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unlockedDate: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.tiny,
    color: "#4CAF50",
  },
  hintText: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
  },
});
