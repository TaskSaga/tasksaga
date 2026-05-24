import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { theme } from "../theme";
import Button from "./Button";
import Input from "./Input";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { HabitFormProps } from "./types/HabitForm.types";

export default function HabitForm({
  isVisible,
  onClose,
  onSubmit,
  initialData,
  bosses = [],
  isSubmitting,
}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState("100");
  const [bossId, setBossId] = useState<number | undefined>();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setXpReward(initialData.xpReward.toString());
      setBossId(initialData.bossId);
    } else {
      setTitle("");
      setDescription("");
      setXpReward("100");
      setBossId(undefined);
    }
  }, [initialData, isVisible]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      xpReward: parseInt(xpReward) || 100,
      bossId,
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.titleText}>
                    {initialData ? "Edit Habit" : "New Habit"}
                  </Text>
                  <TouchableOpacity onPress={onClose}>
                    <AntDesign
                      name="close"
                      size={24}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                <Input
                  label="Title"
                  placeholder="e.g., Morning Run"
                  value={title}
                  onChangeText={setTitle}
                />

                <Input
                  label="Description (Optional)"
                  placeholder="e.g., Run 5km around the park"
                  value={description}
                  onChangeText={setDescription}
                />

                <Input
                  label="XP Reward"
                  placeholder="100"
                  value={xpReward}
                  onChangeText={setXpReward}
                  keyboardType="numeric"
                />

                <Text style={styles.label}>Link to Boss</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.bossList}
                >
                  <TouchableOpacity
                    style={[
                      styles.bossItem,
                      bossId === undefined && styles.bossItemActive,
                    ]}
                    onPress={() => setBossId(undefined)}
                  >
                    <Text
                      style={[
                        styles.bossItemText,
                        bossId === undefined && styles.bossItemTextActive,
                      ]}
                    >
                      None
                    </Text>
                  </TouchableOpacity>
                  {bosses.map((boss) => (
                    <TouchableOpacity
                      key={boss.id}
                      style={[
                        styles.bossItem,
                        bossId === boss.id && styles.bossItemActive,
                      ]}
                      onPress={() => setBossId(boss.id)}
                    >
                      <MaterialCommunityIcons
                        name="sword-cross"
                        size={14}
                        color={
                          bossId === boss.id
                            ? theme.colors.white
                            : theme.colors.error
                        }
                      />
                      <Text
                        style={[
                          styles.bossItemText,
                          bossId === boss.id && styles.bossItemTextActive,
                        ]}
                      >
                        {boss.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Button
                  title={initialData ? "Update Habit" : "Create Habit"}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  style={styles.submitButton}
                  disabled={!title.trim()}
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  titleText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  label: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  bossList: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },
  bossItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bossItemActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  bossItemText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  bossItemTextActive: {
    color: theme.colors.white,
    fontFamily: theme.typography.fonts.bold,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
});
