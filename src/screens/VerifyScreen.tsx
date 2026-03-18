import { useState } from "react";
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
import { verifyEmail } from "../api/auth";

export default function VerifyScreen({ route, navigation }: any) {
  const { email } = route.params;
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          We’ve sent a verification code to your email. Please verify your email
          address.
        </Text>

        <Text style={styles.email}>{email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <View style={styles.button}>
          <Button title="Verify" onPress={onVerify} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  email: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
  },
});
