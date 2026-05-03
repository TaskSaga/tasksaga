import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { theme } from "../theme";

type FocusHandler = NonNullable<TextInputProps["onFocus"]>;
type BlurHandler = NonNullable<TextInputProps["onBlur"]>;
type FocusEvent = Parameters<FocusHandler>[0];
type BlurEvent = Parameters<BlurHandler>[0];

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: BlurEvent) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontFamily: theme.typography.fonts.semiBold,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    height: 56,
    justifyContent: "center",
  },
  inputFocused: {
    borderColor: theme.colors.secondary,
    backgroundColor: "#7300ff1a",
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    fontFamily: theme.typography.fonts.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    height: "100%",
  },
  errorText: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.tiny,
    color: theme.colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
