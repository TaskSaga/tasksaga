import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { login, googleLogin } from "../api/auth";
import { saveToken } from "../auth/storage";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type LoginScreenProps = NativeStackScreenProps<ParamListBase, "Login"> & {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({
  setToken,
  navigation,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const redirectUri = AuthSession.makeRedirectUri({ scheme: "tasksaga" });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
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
    } catch (err: any) {
      Alert.alert("Error", err.message || "Server error");
    }
  };

  // const handleGooglePress = async () => {
  //   if (Platform.OS === "web") {
  //     const clientId = "477138754514-3qdjvqvgkcnffrfjcbok00ttrnpcefi4.apps.googleusercontent.com";
  //     const redirect = encodeURIComponent(redirectUri);
  //     const scope = encodeURIComponent("openid profile email");
  //     const nonce = "randomnonce123";
  //       const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect}&response_type=id_token&scope=${scope}&nonce=${nonce}`;
  //     window.location.href = url;
  //   } else {
  //     await promptAsync();
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email or username</Text>
        <TextInput
          placeholder="Email or username"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={onLogin} />
        </View>

        <View style={{ height: 20 }} />

        {/* <Button title="Login with Google" onPress={handleGooglePress} disabled={!request} /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  label: { fontSize: 16, marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: { marginTop: 10 },
});
