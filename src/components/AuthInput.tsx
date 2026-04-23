import React from "react";
import {
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  View,
} from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
}

export default function AuthInput({ label, ...props }: AuthInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#ccc" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    fontFamily: "TaskSaga-Regular",
  },
  input: {
    fontFamily: "TaskSaga-Bold",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#ffffff1a",
    color: "#fff",
  },
});
