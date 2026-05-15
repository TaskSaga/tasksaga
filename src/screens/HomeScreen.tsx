import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView as RNCSafeAreaView } from "react-native-safe-area-context";
import { removeToken } from "../auth/storage";
import { AntDesign } from "@expo/vector-icons";
import MentorProfile from "../components/MentorProfile";
import QuestCard from "../components/QuestCard";
import SidebarMenu from "../components/SidebarMenu";
import { theme } from "../theme";

interface HomeScreenProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Quest {
  id: number;
  title: string;
  xpReward: number;
  status: "pending" | "completed" | "skipped";
}

export default function HomeScreen({ setToken }: HomeScreenProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  // User Stats
  const [xp, setXp] = useState(450);
  const [level, setLevel] = useState(5);
  const maxXp = 1000;
  const [questsCompleted, setQuestsCompleted] = useState(12);
  const streak = 3;

  // Dynamic Quest List
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      title: "30-Minute Morning Meditation",
      xpReward: 150,
      status: "pending",
    },
    {
      id: 2,
      title: "Read 20 Pages of a Book",
      xpReward: 100,
      status: "pending",
    },
    {
      id: 3,
      title: "Drink 2 Liters of Water",
      xpReward: 50,
      status: "pending",
    },
  ]);

  const onLogout = async () => {
    await removeToken();
    setToken(null);
  };

  const handleCompleteQuest = (questId: number, reward: number) => {
    // Update quest status
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, status: "completed" } : q)),
    );

    setQuestsCompleted((prev) => prev + 1);

    // Calculate level ups
    setXp((prev) => {
      const newXp = prev + reward;
      if (newXp >= maxXp) {
        setLevel((l) => l + 1);
        return newXp - maxXp; // Carry over remainder XP
      }
      return newXp;
    });
  };

  const handleSkipQuest = (questId: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, status: "skipped" } : q)),
    );
  };

  return (
    <RNCSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.spacer} />
          <Text style={styles.headerTitle}>TaskSaga</Text>
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

          {/* Quest Board Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quest Board</Text>
            <Text style={styles.sectionSubtitle}>
              {quests.filter((q) => q.status === "completed").length}/
              {quests.length} Completed
            </Text>
          </View>

          {/* Render Quests Dynamically */}
          {quests.map((quest) => (
            <View key={quest.id} style={styles.scrollItem}>
              <QuestCard
                title={quest.title}
                xpReward={quest.xpReward}
                onComplete={() => handleCompleteQuest(quest.id, quest.xpReward)}
                onSkip={() => handleSkipQuest(quest.id)}
                completeButtonDisabled={quest.status === "completed"}
                isSkipped={quest.status === "skipped"}
              />
            </View>
          ))}
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
    backgroundColor: "#ffffff05", // Slight highlight for the mentor area
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xl,
    marginTop: -theme.spacing.sm, // Pull it slightly up towards the mentor portrait
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
    alignItems: "baseline",
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
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
  scrollItem: {
    marginBottom: theme.spacing.sm, // Changed from marginTop to marginBottom for list spacing
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
