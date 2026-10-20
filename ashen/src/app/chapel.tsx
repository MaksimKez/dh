import { router } from "expo-router";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import { playClick } from "@/audio";

export default function ChapelScreen() {
  const [report, setReport] = useState("The warden raises a rusted sword. Roll higher than the enemy.");

  async function roll() {
    await playClick();
    const hero = Math.floor(Math.random() * 6) + 1;
    const enemy = Math.floor(Math.random() * 6) + 1;
    if (hero > enemy) {
      setReport(`You rolled ${hero}. The warden rolled ${enemy}. The sword falls.`);
      router.push("/victory");
      return;
    }
    if (hero < enemy) {
      setReport(`You rolled ${hero}. The warden rolled ${enemy}. The chapel goes dark.`);
      router.push("/death");
      return;
    }
    setReport(`You both rolled ${hero}. The warden waits. Roll again.`);
  }

  return (
    <View style={styles.page}>
      <Image source={require("../../assets/story/chapel.jpg")} style={styles.image} />
      <Text style={styles.title}>The Warden</Text>
      <Text style={styles.copy}>
        A six-sided die decides the chapel. A higher roll breaks the warden. A lower roll is death.
      </Text>
      <Text style={styles.report}>{report}</Text>
      <Button title="Roll the dice" onPress={roll} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#141821",
    padding: 20,
    gap: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  title: {
    color: "#f3e6c5",
    fontSize: 28,
    fontFamily: "Cinzel_700Bold",
  },
  copy: {
    color: "#f7f1e3",
    fontSize: 16,
    lineHeight: 24,
  },
  report: {
    color: "#f3e6c5",
    fontSize: 18,
    lineHeight: 26,
  },
});
