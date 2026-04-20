import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type MentorArchetype = "Mage" | "Warrior" | "Cowboy";
type MentorState = "idle" | "encouraging" | "disappointed" | "celebrating";

interface MentorProfileProps {
  name: string;
  archetype: MentorArchetype;
  state: MentorState;
}

export default function MentorProfile({
  name,
  archetype,
  state,
}: MentorProfileProps) {
  // Placeholder for real mentor art. This will be replaced with actual assets.
  const mentorColors = {
    Mage: "#3F51B5",
    Warrior: "#D32F2F",
    Cowboy: "#FFA000",
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.artPlaceholder,
          { borderColor: mentorColors[archetype] },
        ]}
      >
        <Text style={styles.stateText}>{state.toUpperCase()}</Text>
        <Text style={styles.placeholderIcon}>👤</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.archetype, { color: mentorColors[archetype] }]}>
          {archetype.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 15,
  },
  artPlaceholder: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: (width * 0.45) / 2,
    borderWidth: 3,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  placeholderIcon: {
    fontSize: 60,
  },
  stateText: {
    position: "absolute",
    top: 20,
    fontFamily: "TaskSaga-Bold",
    fontSize: 10,
    color: "#999",
    letterSpacing: 1.5,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  name: {
    fontFamily: "TaskSaga-Bold",
    fontSize: 20,
    color: "#333",
  },
  archetype: {
    fontFamily: "TaskSaga-Regular",
    fontSize: 12,
    letterSpacing: 2,
  },
});
