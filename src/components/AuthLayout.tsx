import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../theme";

import { AuthLayoutProps } from "./types/AuthLayout.types";

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <LinearGradient
      colors={[
        theme.colors.background,
        theme.colors.secondary,
        theme.colors.background,
      ]}
      style={styles.gradientContainer}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  innerContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
});
