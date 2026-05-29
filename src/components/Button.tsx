import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { theme } from "../theme";

import { ButtonProps } from "./types/Button.types";

export default function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          container: { backgroundColor: theme.colors.card },
          text: { color: theme.colors.text },
        };
      case "outline":
        return {
          container: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
          text: { color: theme.colors.text },
        };
      case "ghost":
        return {
          container: { backgroundColor: "transparent" },
          text: { color: theme.colors.textSecondary }, // Changed from theme.colors.text
        };
      default:
        return {
          container: { backgroundColor: theme.colors.secondary },
          text: { color: theme.colors.white },
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          container: { paddingVertical: 8, paddingHorizontal: 16 },
          text: { fontSize: theme.typography.sizes.small },
        };
      case "lg":
        return {
          container: { paddingVertical: 16, paddingHorizontal: 32 },
          text: { fontSize: theme.typography.sizes.h4 },
        };
      default:
        return {
          container: { paddingVertical: 12, paddingHorizontal: 24 },
          text: { fontSize: theme.typography.sizes.body },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        styles.baseContainer,
        variantStyles.container,
        sizeStyles.container,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.baseText,
              variantStyles.text,
              sizeStyles.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: theme.borderRadius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  baseText: {
    fontFamily: theme.typography.fonts.bold,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
