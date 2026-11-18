import { router } from "expo-router";
import { useContext, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import { playClick } from "@/audio";
import { ThemeContext } from "@/context/theme-context";
import { useGameText } from "@/hooks/use-game-text";

export default function ChapelScreen() {
  const text = useGameText();
  const { colors } = useContext(ThemeContext);
  const [report, setReport] = useState(text("chapelReady"));

  async function roll() {
    await playClick();
    const hero = Math.floor(Math.random() * 6) + 1;
    const enemy = Math.floor(Math.random() * 6) + 1;
    const values = { hero: String(hero), enemy: String(enemy) };
    if (hero > enemy) {
      setReport(text("rollWin", values));
      router.push("/victory");
      return;
    }
    if (hero < enemy) {
      setReport(text("rollLose", values));
      router.push("/death");
      return;
    }
    setReport(text("rollTie", values));
  }

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <Image source={require("../../assets/story/chapel.jpg")} style={styles.image} />
      <Text style={[styles.title, { color: colors.title }]}>{text("wardenTitle")}</Text>
      <Text style={[styles.copy, { color: colors.text }]}>{text("chapelLead")}</Text>
      <Text style={[styles.report, { color: colors.title }]}>{report}</Text>
      <Button title={text("rollDice")} onPress={roll} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "Cinzel_700Bold",
  },
  copy: {
    fontSize: 16,
    lineHeight: 24,
  },
  report: {
    fontSize: 18,
    lineHeight: 26,
  },
});
