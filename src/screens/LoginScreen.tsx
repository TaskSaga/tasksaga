import { Text, Alert, StyleSheet, Platform } from "react-native";
import { useState, useEffect } from "react";
import { login, googleLogin, appleLogin } from "../api/auth";
import { saveToken } from "../auth/storage";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

type LoginScreenProps = NativeStackScreenProps<ParamListBase, "Login"> & {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({
  setToken,
  navigation,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    const checkAppleAuth = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    if (Platform.OS === "ios") {
      checkAppleAuth();
    }
  }, []);

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

  const onApplePress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const res = await appleLogin(credential.identityToken);
        if (res.access_token) {
          await saveToken(res.access_token);
          setToken(res.access_token);
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        } else {
          Alert.alert("Error", res.detail ?? "Apple login failed");
        }
      }
    } catch (e: unknown) {
      const error = e as { code?: string; message?: string };
      if (error.code === "ERR_CANCELED") {
        // User canceled, do nothing
      } else {
        Alert.alert(
          "Error",
          error.message || "An error occurred during Apple Sign In",
        );
      }
    }
  };

  return (
    <AuthLayout>
      <Text style={[styles.title, { fontFamily: "TaskSaga-Bold" }]}>
        Sign In
      </Text>

      <AuthInput
        label="Email or username"
        placeholder="name@domain.com"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />

      <AuthInput
        label="Password"
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={[styles.buttonText, { fontFamily: "TaskSaga-Bold" }]}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={[styles.orText, { fontFamily: "TaskSaga-Regular" }]}>
        or
      </Text>

      <TouchableOpacity
        style={styles.authbutton}
        onPress={() => Alert.alert("Notice", "Google login triggered")}
      >
        <AntDesign style={styles.googleicon} name="google" />
        <Text style={[styles.authbuttonText, { fontFamily: "TaskSaga-Bold" }]}>
          Sign In with Google
        </Text>
      </TouchableOpacity>

      {appleAuthAvailable && (
        <TouchableOpacity style={styles.authbutton} onPress={onApplePress}>
          <AntDesign style={styles.appleicon} name="apple" />
          <Text
            style={[styles.authbuttonText, { fontFamily: "TaskSaga-Bold" }]}
          >
            Sign In with Apple
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backButtonText, { fontFamily: "TaskSaga-Bold" }]}>
          Back to Welcome
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#340375",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 18 },
  orText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  authbutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#ffffff1a",
    marginBottom: 15,
    gap: 10,
  },
  authbuttonText: { color: "#fff", fontSize: 18 },
  googleicon: { fontSize: 20, color: "#ffffff" },
  appleicon: { fontSize: 20, color: "#ffffff" },
  backButton: { alignItems: "center", marginTop: 10 },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
