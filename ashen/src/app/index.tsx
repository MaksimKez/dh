import { router } from "expo-router";
import { useEffect } from "react";
import {
  BackHandler,
  Button,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { playClick, startTheme } from "@/audio";

export default function HomeScreen() {
  useEffect(() => {
    startTheme().catch(() => undefined);
  }, []);

  async function begin(path: "/crossroads" | "/market") {
    await playClick();
    router.push(path);
  }

  async function exitGame() {
    await playClick();
    if (Platform.OS === "web") {
      window.close();
      return;
    }
    BackHandler.exitApp();
  }

  return (
    <ImageBackground source={require("../../assets/story/gate.jpg")} style={styles.background}>
      <View style={styles.shade}>
        <Image source={require("../../assets/story/logo.jpg")} style={styles.logo} />
        <Text style={styles.lead}>
          The Ashen Gate stands open. Two roads leave the threshold, and only one of them ends in daylight.
        </Text>
        <View style={styles.actions}>
          <Button title="Start a new game" onPress={() => begin("/crossroads")} />
          <Button title="Slip into the night market" onPress={() => begin("/market")} />
          <Button title="Exit" onPress={exitGame} color="#8b3a3a" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  shade: {
    flex: 1,
    backgroundColor: "rgba(10, 12, 18, 0.55)",
    padding: 24,
    justifyContent: "flex-end",
    gap: 16,
  },
  logo: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  lead: {
    color: "#f7f1e3",
    fontSize: 18,
    lineHeight: 26,
    fontFamily: "Cinzel_700Bold",
  },
  actions: {
    gap: 10,
  },
});
