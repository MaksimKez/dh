import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page not found" }} />
      <View style={styles.container}>
        <Link href="/" style={styles.link}>
          This page does not exist. Return to the gate.
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141821",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  link: {
    color: "#f3e6c5",
    fontSize: 18,
    textAlign: "center",
  },
});