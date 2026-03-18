import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";

type WelcomeScreenProps = {
  navigation: any;
  route: unknown;
  fontsLoaded: boolean;
};

export default function WelcomeScreen({ navigation, fontsLoaded }: WelcomeScreenProps) {
  const [identifier, setIdentifier] = useState("");

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={['#1d033b', '#7300ff', '#1d033b']}
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
          <View style={styles.innerContainer}>
            <Text style={[styles.title, { fontFamily: "TaskSaga-Bold" }]}>
              Welcome back
            </Text>

            <Text style={[styles.label, { fontFamily: "TaskSaga-Regular" }]}>
              Email or username
            </Text>
            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              style={[styles.input, { fontFamily: "TaskSaga-Regular" }]}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={[styles.buttonText, { fontFamily: "TaskSaga-Bold" }]}>
                Continue
              </Text>
            </TouchableOpacity>

            <Text style={[styles.orText, { fontFamily: "TaskSaga-Regular" }]}>or</Text>

            <TouchableOpacity style={styles.authbutton}>
              <AntDesign style={[styles.googleicon]} name="google"/>
              <Text style={[styles.authbuttonText, { fontFamily: "TaskSaga-Bold" }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authbutton}>
              <AntDesign style={[styles.appleicon]} name="apple"/>
              <Text style={[styles.authbuttonText, { fontFamily: "TaskSaga-Bold" }]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>

            <Text style={[styles.preSignUpText, { fontFamily: "TaskSaga-Regular" }]}>
              Don't have an account?
            </Text>
            <TouchableOpacity style={styles.SignUpButton} onPress={()=> navigation.navigate("Register")}>
              <Text style={[styles.SignUpButtonText, { fontFamily: "TaskSaga-Bold" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  appleicon: {fontSize: 20, color: "#ffffff", },
  googleicon: {fontSize: 20, color: "#ffffff", },
  gradientContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  innerContainer: { flex: 1, padding: 24, justifyContent: "center", },
  title: { fontSize: 34, fontWeight: "700", color: "#fff", marginBottom: 40, textAlign: "center" },
  label: { fontWeight: "700", color: "#fff", marginBottom: 8 },
  input: { fontFamily: "TaskSaga-Bold", borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 12, marginBottom: 20, backgroundColor: "#ffffff1a", color: "#fff" },
  button: { paddingVertical: 10, borderRadius: 20, alignItems: "center", backgroundColor: "#340375", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 18,},
  orText: { fontWeight: "700", color: "#fff", textAlign: "center", marginBottom: 20 },
  authbutton: {flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10, borderRadius: 20, backgroundColor: "#ffffff1a", marginBottom: 20, gap:10 },
  authbuttonText: { color: "#fff", fontSize: 18, },
  preSignUpText: { color: "#fff", textAlign: "center", marginVertical: 10 },
  SignUpButton: { alignItems: "center" },
  SignUpButtonText: { color: "#fff", fontSize: 18 },
});
