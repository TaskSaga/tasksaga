import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "../theme";

const { width } = Dimensions.get("window");

import { MentorProfileProps } from "./types/MentorProfile.types";

export default function MentorProfile({
  name,
  archetype,
  state,
}: MentorProfileProps) {
  const mentorColors = {
    Mage: theme.colors.primary,
    Warrior: theme.colors.error,
    Cowboy: theme.colors.accent,
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
    marginVertical: theme.spacing.lg,
  },
  artPlaceholder: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    borderWidth: 2,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  placeholderIcon: {
    fontSize: 60,
  },
  stateText: {
    position: "absolute",
    top: 15,
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
    letterSpacing: 1.5,
  },
  textContainer: {
    marginTop: theme.spacing.sm,
    alignItems: "center",
  },
  name: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  archetype: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.tiny,
    letterSpacing: 2,
  },
});
