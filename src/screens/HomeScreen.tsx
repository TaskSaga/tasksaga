import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { removeToken } from "../auth/storage";
import LevelIndicator from "../components/LevelIndicator";
import MentorProfile from "../components/MentorProfile";
import QuestCard from "../components/QuestCard";

type HomeScreenProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function HomeScreen({ setToken }: HomeScreenProps) {
  const [xp, setXp] = useState(450);
  const [level, setLevel] = useState(5);
  const maxXp = 1000;

  const onLogout = async () => {
    await removeToken();
    setToken(null);
  };

  const handleCompleteQuest = (reward: number) => {
    setXp((prev) => {
      const newXp = prev + reward;
      if (newXp >= maxXp) {
        setLevel((l) => l + 1);
        return newXp - maxXp;
      }
      return newXp;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <LevelIndicator level={level} xp={xp} maxXp={maxXp} />
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <MentorProfile name="Archmage Elara" archetype="Mage" state="idle" />

          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              Greetings, Traveler. Today's path is clear. To progress in your
              journey, you must focus on the task at hand.
            </Text>
          </View>

          <QuestCard
            title="30-Minute Morning Meditation"
            xpReward={150}
            onComplete={() => handleCompleteQuest(150)}
            onSkip={() => {}}
          />

          <QuestCard
            title="Read 20 Pages of a Book"
            xpReward={100}
            onComplete={() => handleCompleteQuest(100)}
            onSkip={() => {}}
          />
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type your response..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    fontFamily: "TaskSaga-Regular",
    fontSize: 12,
    color: "#D32F2F",
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  messageBubble: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  messageText: {
    fontFamily: "TaskSaga-Regular",
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  inputArea: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#F0F2F5",
    borderRadius: 22,
    paddingHorizontal: 20,
    fontFamily: "TaskSaga-Regular",
    fontSize: 15,
    color: "#333",
  },
  sendButton: {
    marginLeft: 12,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 14,
    color: "#3F51B5",
  },
});
