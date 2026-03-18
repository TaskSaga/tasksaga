import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import AppNavigator from "./src/navigation/AppNavigator";
import { getToken, saveToken } from "./src/auth/storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "TaskSaga-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "TaskSaga-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        let t: string | null = null;

        if (Platform.OS === "web" && typeof window !== "undefined") {
          const params = new URLSearchParams(window.location?.search ?? "");
          t = params.get("token");
          if (t) {
            await saveToken(t);
            window.history.replaceState({}, document.title, "/");
          }
        }

        if (!t) {
          t = await getToken();
        }

        setToken(t);
      } catch (e) {
        console.warn("App initialization error:", e);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (appReady && (fontsLoaded || fontError)) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [appReady, fontsLoaded, fontError]);

  if (!appReady) return null;
  if (!fontsLoaded && fontError) {
    console.warn("Font loading failed, using fallback fonts.");
  }

  return <AppNavigator token={token} setToken={setToken} fontsLoaded={fontsLoaded} />;
}
