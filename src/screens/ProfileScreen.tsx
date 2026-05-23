import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import * as authApi from "../api/auth";
import LevelIndicator from "../components/LevelIndicator";
import Card from "../components/Card";

import {
  ProfileData,
  ProfileScreenProps,
} from "../components/types/ProfileScreen.types";

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = (await authApi.getProfile()) as unknown as ProfileData;
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const attributes = [
    {
      label: "Strength",
      value: profile?.strength || 10,
      icon: "arm-flex",
      color: theme.colors.error,
      description: "Physical power and endurance",
    },
    {
      label: "Intelligence",
      value: profile?.intelligence || 10,
      icon: "brain",
      color: theme.colors.primary,
      description: "Knowledge and mental acuity",
    },
    {
      label: "Dexterity",
      value: profile?.dexterity || 10,
      icon: "run-fast",
      color: theme.colors.secondary,
      description: "Agility and precision",
    },
    {
      label: "Spirit",
      value: profile?.spirit || 10,
      icon: "auto-fix",
      color: theme.colors.success,
      description: "Willpower and social presence",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Character Sheet</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Character Info */}
        <View style={styles.characterHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarEmojiLarge}>🤠</Text>
          </View>
          <Text style={styles.usernameLarge}>
            {profile?.username || "Traveler"}
          </Text>
          <Text style={styles.rankLarge}>Novice Adventurer</Text>
        </View>

        {/* Level & XP */}
        <View style={styles.levelSection}>
          <LevelIndicator
            level={profile?.level || 1}
            xp={profile?.currentXp || 0}
            maxXp={1000}
          />
        </View>

        {/* Attributes */}
        <Text style={styles.sectionTitle}>Attributes</Text>
        <View style={styles.attributesGrid}>
          {attributes.map((attr, index) => (
            <Card key={index} style={styles.attributeCard}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: attr.color + "22" },
                ]}
              >
                <MaterialCommunityIcons
                  name={
                    attr.icon as keyof typeof MaterialCommunityIcons.glyphMap
                  }
                  size={24}
                  color={attr.color}
                />
              </View>
              <Text style={styles.attributeLabel}>{attr.label}</Text>
              <Text style={[styles.attributeValue, { color: attr.color }]}>
                {attr.value}
              </Text>
              <Text style={styles.attributeDesc}>{attr.description}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  spacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  characterHeader: {
    alignItems: "center",
    marginVertical: theme.spacing.lg,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
    borderWidth: 3,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatarEmojiLarge: {
    fontSize: 48,
  },
  usernameLarge: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.text,
  },
  rankLarge: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.accent,
    letterSpacing: 1,
  },
  levelSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  attributesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.spacing.sm,
    justifyContent: "space-between",
  },
  attributeCard: {
    width: "47%",
    marginBottom: theme.spacing.md,
    alignItems: "center",
    padding: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  attributeLabel: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  attributeValue: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h3,
    marginVertical: 4,
  },
  attributeDesc: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
