import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import VerifyScreen from "../screens/VerifyScreen";
import HomeScreen from "../screens/HomeScreen";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

type AppNavigatorProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  fontsLoaded: boolean;
};

export default function AppNavigator({ token, setToken, fontsLoaded }: AppNavigatorProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Welcome">
              {(props) => <WelcomeScreen {...props} fontsLoaded={fontsLoaded} />}
            </Stack.Screen>

            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setToken={setToken} />}
            </Stack.Screen>

            <Stack.Screen name="Register">
              {(props) => <RegisterScreen {...props} fontsLoaded={fontsLoaded} setToken={setToken} />}
            </Stack.Screen>

            <Stack.Screen name="Verify" component={VerifyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
