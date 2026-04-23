import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <LinearGradient
      colors={["#1d033b", "#7300ff", "#1d033b"]}
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
  innerContainer: { flex: 1, padding: 24, justifyContent: "center" },
});
