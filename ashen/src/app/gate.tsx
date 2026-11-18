import { router } from "expo-router";
import { useContext, useEffect } from "react";
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
import { ThemeContext } from "@/context/theme-context";
import { useGameText } from "@/hooks/use-game-text";

export default function GateScreen() {
  const text = useGameText();
  const { colors } = useContext(ThemeContext);

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
      <View style={[styles.shade, { backgroundColor: colors.shade }]}>
        <Image source={require("../../assets/story/logo.jpg")} style={styles.logo} />
        <Text style={[styles.lead, { color: colors.text }]}>{text("greeting")}</Text>
        <Text style={[styles.lead, { color: colors.text }]}>{text("inventory")}</Text>
        <Text style={[styles.lead, { color: colors.text }]}>{text("gateLead")}</Text>
        <View style={styles.actions}>
          <Button title={text("newGame")} onPress={() => begin("/crossroads")} />
          <Button title={text("nightMarket")} onPress={() => begin("/market")} />
          <Button title={text("exit")} onPress={exitGame} color={colors.button} />
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
    fontSize: 18,
    lineHeight: 26,
    fontFamily: "Cinzel_700Bold",
  },
  actions: {
    gap: 10,
  },
});
