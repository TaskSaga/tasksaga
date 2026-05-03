import { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
} from "react-native";
import { verifyEmail } from "../api/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { theme } from "../theme";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/AuthLayout";

type VerifyScreenProps = NativeStackScreenProps<ParamListBase, "Verify">;

export default function VerifyScreen({ route, navigation }: VerifyScreenProps) {
  const { email } = route.params as { email: string };
  const [code, setCode] = useState("");

  const onVerify = async () => {
    try {
      const res = await verifyEmail({ email, code });

      if (res.detail) {
        Alert.alert("Error", res.detail);
        return;
      }

      Alert.alert("Success", "Account verified");
      navigation.replace("Login");
    } catch {
      Alert.alert("Error", "Invalid code");
    }
  };

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We’ve sent a verification code to
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <Input
        label="Verification Code"
        placeholder="123456"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        textAlign="center"
        style={styles.input}
      />

      <Button
        title="Verify"
        onPress={onVerify}
        style={styles.verifyButton}
      />

      <View style={styles.footer}>
        <Button
          title="Back to Login"
          variant="ghost"
          onPress={() => navigation.navigate("Login")}
          textStyle={styles.backButtonText}
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
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  email: {
    fontFamily: theme.typography.fonts.semiBold,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.secondary,
    textAlign: "center",
    marginTop: 4,
  },
  input: {
    fontSize: 24,
    letterSpacing: 8,
  },
  verifyButton: {
    marginTop: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    textDecorationLine: "underline",
  },
});
