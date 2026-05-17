import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { register } from "../api/auth";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppleAuth } from "../hooks/useAppleAuth";
import { theme } from "../theme";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";

type RegisterScreenProps = NativeStackScreenProps<ParamListBase, "Register"> & {
  fontsLoaded: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function RegisterScreen({
  navigation,
  fontsLoaded,
  setToken,
}: RegisterScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { isAvailable, handleAppleAuth } = useAppleAuth(setToken);

  const onRegister = async () => {
    if (!identifier || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    try {
      const _res = await register({ identifier, password });
      navigation.navigate("Verify", { email: identifier });
    } catch (err: unknown) {
      const error = err as Error;
      Alert.alert("Error", error.message || "Registration failed");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Sign up & explore</Text>
      </View>

      <Input
        label="Email address"
        value={identifier}
        onChangeText={setIdentifier}
        placeholder="name@domain.com"
        autoCapitalize="none"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        secureTextEntry
      />

      <Button title="Next" onPress={onRegister} style={styles.nextButton} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        title="Sign Up with Google"
        variant="secondary"
        icon={<AntDesign name="google" size={20} color={theme.colors.white} />}
        onPress={() =>
          Alert.alert("Google Sign Up", "Google Sign Up not implemented")
        }
        style={styles.socialButton}
      />

      {isAvailable && (
        <Button
          title="Sign Up with Apple"
          variant="secondary"
          icon={<AntDesign name="apple" size={20} color={theme.colors.white} />}
          onPress={handleAppleAuth}
          style={styles.socialButton}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.preSignUpText}>Already have an account?</Text>
        <Button
          title="Log in"
          variant="ghost"
          onPress={() => navigation.goBack()}
          textStyle={styles.loginText}
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
  nextButton: {
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
  loginText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
});
