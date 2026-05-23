import { Text, Alert, StyleSheet, Platform, View } from "react-native";
import { useState, useEffect } from "react";
import { login, googleLogin } from "../api/auth";
import { saveToken } from "../auth/storage";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthLayout from "../components/AuthLayout";
import { AntDesign } from "@expo/vector-icons";
import { useAppleAuth } from "../hooks/useAppleAuth";
import { theme } from "../theme";
import Button from "../components/Button";
import Input from "../components/Input";

type LoginScreenProps = NativeStackScreenProps<ParamListBase, "Login"> & {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({
  setToken,
  navigation,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { isAvailable, handleAppleAuth } = useAppleAuth(setToken);

  const redirectUri = AuthSession.makeRedirectUri({ scheme: "tasksaga" });

  const [_request, response, _promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: "477138754514-r2juqvhnt4qncov6qdchn2h1m371d2hd.apps.googleusercontent.com",
      android:
        "477138754514-ril0vef7hb6nn0joat864720ci5tasa5.apps.googleusercontent.com",
      web: "477138754514-3qdjvqvgkcnffrfjcbok00ttrnpcefi4.apps.googleusercontent.com",
    }),
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  useEffect(() => {
    if (Platform.OS === "web") {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const id_token = params.get("id_token");
        if (id_token) {
          handleGoogleLogin(id_token);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }
      }
    }
  }, []);

  const onLogin = async () => {
    try {
      const res = await login({ identifier, password });
      if (res.access_token) {
        await saveToken(res.access_token);
        setToken(res.access_token);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert("Error", res.detail ?? "Login failed");
      }
    } catch {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  const handleGoogleLogin = async (id_token: string) => {
    try {
      const res = await googleLogin(id_token);
      if (res.access_token) {
        await saveToken(res.access_token);
        setToken(res.access_token);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert("Error", res.detail ?? "Google login failed");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Server error";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <Input
        label="Email or username"
        placeholder="name@domain.com"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />

      <Input
        label="Password"
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={onLogin} style={styles.loginButton} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        title="Sign In with Google"
        variant="secondary"
        icon={<AntDesign name="google" size={20} color={theme.colors.white} />}
        onPress={() => _promptAsync()}
        style={styles.socialButton}
      />

      {isAvailable && (
        <Button
          title="Sign In with Apple"
          variant="secondary"
          icon={<AntDesign name="apple" size={20} color={theme.colors.white} />}
          onPress={handleAppleAuth}
          style={styles.socialButton}
        />
      )}

      <View style={styles.footer}>
        <Button
          title="Back to Welcome"
          variant="ghost"
          onPress={() => navigation.goBack()}
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
  },
  loginButton: {
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
  backButtonText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    textDecorationLine: "underline",
  },
});
