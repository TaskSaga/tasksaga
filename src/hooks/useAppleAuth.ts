import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { appleLogin } from "../api/auth";
import { saveToken } from "../auth/storage";

export const useAppleAuth = (
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      AppleAuthentication.isAvailableAsync().then(setIsAvailable);
    }
  }, []);

  const handleAppleAuth = async () => {
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
          return true; // Indicate success
        } else {
          Alert.alert("Error", res.detail ?? "Apple authentication failed");
        }
      }
    } catch (e: any) {
      if (e.code !== "ERR_CANCELED") {
        Alert.alert(
          "Error",
          e.message || "An error occurred during Apple Auth",
        );
      }
    }
    return false;
  };

  return { isAvailable, handleAppleAuth };
};
