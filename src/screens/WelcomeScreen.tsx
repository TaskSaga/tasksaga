import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppleAuth } from "../hooks/useAppleAuth";
import { theme } from "../theme";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";

type WelcomeScreenProps = NativeStackScreenProps<ParamListBase, "Welcome"> & {
  fontsLoaded: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function WelcomeScreen({
  navigation,
  fontsLoaded,
  setToken,
}: WelcomeScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const { isAvailable, handleAppleAuth } = useAppleAuth(setToken);

  if (!fontsLoaded) return null;

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
      </View>

      <Input
        label="Email or username"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        placeholder="Enter your email"
      />

      <Button
        title="Continue"
        onPress={() => {}} // TODO: Handle continue
        style={styles.continueButton}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        title="Continue with Google"
        variant="secondary"
        icon={<AntDesign name="google" size={20} color={theme.colors.white} />}
        onPress={() => {}}
        style={styles.socialButton}
      />

      {isAvailable && (
        <Button
          title="Continue with Apple"
          variant="secondary"
          icon={<AntDesign name="apple" size={20} color={theme.colors.white} />}
          onPress={handleAppleAuth}
          style={styles.socialButton}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.preSignUpText}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          variant="ghost"
          onPress={() => navigation.navigate("Register")}
          textStyle={styles.signUpText}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.text,
    textAlign: "center",
  },
  continueButton: {
    marginTop: theme.spacing.md,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.md,
  },
  socialButton: {
    marginBottom: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  preSignUpText: {
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  signUpText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
});
