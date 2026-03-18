import { View, Text, Button, StyleSheet } from "react-native";
import { removeToken } from "../auth/storage";

type HomeScreenProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function HomeScreen({ setToken }: HomeScreenProps) {
  const onLogout = async () => {
    await removeToken();
    setToken(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 TaskSaga</Text>
      <Text style={styles.subtitle}>
        You are logged in. Time to grind some XP.
      </Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
    textAlign: "center",
  },
});
