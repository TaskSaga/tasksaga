import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView as RNCSafeAreaView } from "react-native-safe-area-context";
import { removeToken } from "../auth/storage";
import { AntDesign } from "@expo/vector-icons";
import MentorProfile from "../components/MentorProfile";
import SidebarMenu from "../components/SidebarMenu";
import HabitCard from "../components/HabitCard";
import HabitForm from "../components/HabitForm";
import LevelIndicator from "../components/LevelIndicator";
import { theme } from "../theme";
import * as habitApi from "../api/habit";
import * as authApi from "../api/auth";

interface HomeScreenProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function HomeScreen({ setToken }: HomeScreenProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [habits, setHabits] = useState<habitApi.Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // User Stats
  const [xp, setXp] = useState(450);
  const [level, setLevel] = useState(5);
  const maxXp = 1000;
  const [questsCompleted, setQuestsCompleted] = useState(12);
  const streak = 3;

  // Form State
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<
    habitApi.Habit | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchHabits();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await authApi.getProfile();
      if (user.currentXp !== undefined && user.level !== undefined) {
        setXp(user.currentXp);
        setLevel(user.level);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const fetchHabits = async () => {
    try {
      const data = await habitApi.getHabits();
      setHabits(data);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchHabits();
  };

  const onLogout = async () => {
    await removeToken();
    setToken(null);
  };

  const handleCheckIn = async (habitId: number, reward: number) => {
    try {
      await habitApi.checkInHabit(habitId);

      // Update local state for immediate feedback
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isCompletedToday: true } : h,
        ),
      );

      setQuestsCompleted((prev) => prev + 1);

      // Calculate level ups
      setXp((prev) => {
        const newXp = prev + reward;
        if (newXp >= maxXp) {
          setLevel((l) => l + 1);
          return newXp - maxXp;
        }
        return newXp;
      });
    } catch (err) {
      console.error("Failed to check in:", err);
    }
  };

  const handleFormSubmit = async (data: {
    title: string;
    description?: string;
    xpReward?: number;
  }) => {
    setIsSubmitting(true);
    try {
      if (editingHabit) {
        const updated = await habitApi.updateHabit(editingHabit.id, data);
        setHabits((prev) =>
          prev.map((h) => (h.id === editingHabit.id ? updated : h)),
        );
      } else {
        const created = await habitApi.createHabit(data);
        setHabits((prev) => [...prev, created]);
      }
      setIsFormVisible(false);
      setEditingHabit(undefined);
    } catch (err) {
      console.error("Failed to save habit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditHabit = (habit: habitApi.Habit) => {
    setEditingHabit(habit);
    setIsFormVisible(true);
  };

  const handleArchiveHabit = async (habitId: number) => {
    try {
      await habitApi.deleteHabit(habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (err) {
      console.error("Failed to archive habit:", err);
    }
  };

  const completedCount = habits.filter((h) => h.isCompletedToday).length;

  return (
    <RNCSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <LevelIndicator level={level} xp={xp} maxXp={maxXp} />
          <TouchableOpacity
            style={styles.avatarTrigger}
            onPress={() => setIsSidebarOpen(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.avatarEmoji}>🤠</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          {/* NPC Mentor Interaction Area */}
          <View style={styles.mentorSection}>
            <MentorProfile name="Merlin" archetype="Mage" state="idle" />
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>
                Greetings, Traveler. Today's path is clear. To progress in your
                journey, you must focus on the task at hand.
              </Text>
            </View>
          </View>

          {/* Habit Board Section */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Habit Board</Text>
              <Text style={styles.sectionSubtitle}>
                {completedCount}/{habits.length} Completed
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditingHabit(undefined);
                setIsFormVisible(true);
              }}
            >
              <AntDesign name="plus" size={20} color={theme.colors.white} />
              <Text style={styles.addButtonText}>Add Habit</Text>
            </TouchableOpacity>
          </View>

          {/* Render Habits Dynamically */}
          {habits.map((habit) => (
            <View key={habit.id} style={styles.scrollItem}>
              <HabitCard
                title={habit.title}
                xpReward={habit.xpReward}
                isCompletedToday={habit.isCompletedToday}
                onCheckIn={() => handleCheckIn(habit.id, habit.xpReward)}
                onEdit={() => handleEditHabit(habit)}
                onArchive={() => handleArchiveHabit(habit.id)}
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
        </ScrollView>

        {/* Chat / Command Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Talk to Merlin..."
            placeholderTextColor={theme.colors.textSecondary}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            disabled={!message.trim()}
            activeOpacity={0.7}
          >
            <AntDesign name="arrow-up" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Slide-out Sidebar Overlay */}
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        username="Traveler"
        rank="Novice Adventurer"
        level={level}
        xp={xp}
        maxXp={maxXp}
        streak={streak}
        questsCompleted={questsCompleted}
      />

      {/* Habit Creation/Edit Modal */}
      <HabitForm
        isVisible={isFormVisible}
        onClose={() => {
          setIsFormVisible(false);
          setEditingHabit(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingHabit}
        isSubmitting={isSubmitting}
      />
    </RNCSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  spacer: {
    width: 40,
  },
  avatarTrigger: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 18,
  },
  headerTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: theme.spacing.lg,
  },
  mentorSection: {
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: "#ffffff05",
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xl,
    marginTop: -theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  messageText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    lineHeight: 24,
    textAlign: "center",
  },
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
  inputArea: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.lg,
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
});
