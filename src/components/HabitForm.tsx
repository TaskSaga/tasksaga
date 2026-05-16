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
} from "react-native";
import { theme } from "../theme";
import Button from "./Button";
import Input from "./Input";
import { Habit } from "../api/habit";
import { AntDesign } from "@expo/vector-icons";

interface HabitFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    xpReward?: number;
  }) => void;
  initialData?: Habit;
  isSubmitting?: boolean;
}

export default function HabitForm({
  isVisible,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState("100");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setXpReward(initialData.xpReward.toString());
    } else {
      setTitle("");
      setDescription("");
      setXpReward("100");
    }
  }, [initialData, isVisible]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      xpReward: parseInt(xpReward) || 100,
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
  submitButton: {
    marginTop: theme.spacing.lg,
  },
});
