import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView as RNCSafeAreaView } from "react-native-safe-area-context";
import { removeToken } from "../auth/storage";
import LevelIndicator from "../components/LevelIndicator";
import MentorProfile from "../components/MentorProfile";
import QuestCard from "../components/QuestCard";
import { theme } from "../theme";
import Button from "../components/Button";

type HomeScreenProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function HomeScreen({ setToken }: HomeScreenProps) {
  const [xp, setXp] = useState(450);
  const [level, setLevel] = useState(5);
  const maxXp = 1000;

  // State to track completion of quests
  const [quest1Completed, setQuest1Completed] = useState(false);
  const [quest2Completed, setQuest2Completed] = useState(false);

  // State to track skipped quests
  const [quest1Skipped, setQuest1Skipped] = useState(false);
  const [quest2Skipped, setQuest2Skipped] = useState(false);

  const onLogout = async () => {
    await removeToken();
    setToken(null);
  };

  const handleCompleteQuest = (reward: number, questId: number) => {
    if (questId === 1) setQuest1Completed(true);
    if (questId === 2) setQuest2Completed(true);

    setXp((prev) => {
      const newXp = prev + reward;
      if (newXp >= maxXp) {
        setLevel((l) => l + 1);
        return newXp - maxXp;
      }
      return newXp;
    });
  };

  const handleSkipQuest = (questId: number) => {
    if (questId === 1) setQuest1Skipped(true);
    if (questId === 2) setQuest2Skipped(true);
    // Note: QuestCard will now be styled to show it's skipped, not hidden.
  };

  return (
    <RNCSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <LevelIndicator level={level} xp={xp} maxXp={maxXp} />
          <Button
            title="Logout"
            variant="ghost"
            size="sm"
            onPress={onLogout}
            textStyle={styles.logoutText}
          />
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollItem}>
            <MentorProfile name="Merlin" archetype="Mage" state="idle" />
          </View>

          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              Greetings, Traveler. Today's path is clear. To progress in your
              journey, you must focus on the task at hand.
            </Text>
          </View>

          <View style={styles.scrollItem}>
            <QuestCard
              title="30-Minute Morning Meditation"
              xpReward={150}
              onComplete={() => handleCompleteQuest(150, 1)}
              onSkip={() => handleSkipQuest(1)}
              completeButtonDisabled={quest1Completed}
              isSkipped={quest1Skipped} // Pass the new prop
            />
          </View>

          <View style={styles.scrollItem}>
            <QuestCard
              title="Read 20 Pages of a Book"
              xpReward={100}
              onComplete={() => handleCompleteQuest(100, 2)}
              onSkip={() => handleSkipQuest(2)}
              completeButtonDisabled={quest2Completed}
              isSkipped={quest2Skipped} // Pass the new prop
            />
          </View>
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type your response..."
            placeholderTextColor={theme.colors.textSecondary}
          />
          <Button
            title="SEND"
            size="sm"
            onPress={() => {}}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
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
    paddingRight: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.tiny,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: theme.spacing.lg,
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  scrollItem: {
    marginTop: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },
  messageText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    lineHeight: 22,
  },
  inputArea: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: "center",
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
    marginLeft: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
});
