import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";

import { Hero, type HeroClass } from "./hero";

const CLASSES: HeroClass[] = ["warrior", "paladin", "sorcerer"];
const STATS = ["strength", "stamina", "agility", "magic"] as const;
const POOL = 10;
const BASE = { strength: 3, stamina: 4, agility: 2, magic: 1 };

type StatName = (typeof STATS)[number];
type Stats = Record<StatName, number>;

export default function MainScreen() {
  const [hero] = useState(() => new Hero());
  const [name, setName] = useState(hero.name);
  const [heroClass, setHeroClass] = useState<HeroClass>(hero.heroClass);
  const [stats, setStats] = useState<Stats>({ ...BASE });
  const [openClass, setOpenClass] = useState(false);
  const [picture, setPicture] = useState<string | null>(null);
  const [summary, setSummary] = useState(false);

  const spent =
    stats.strength -
    BASE.strength +
    (stats.stamina - BASE.stamina) +
    (stats.agility - BASE.agility) +
    (stats.magic - BASE.magic);
  const remaining = POOL - spent;
  const ready = remaining === 0 && name.trim() !== "";

  async function playHover() {
    const created = await Audio.Sound.createAsync(require("./assets/hover.wav"), {
      volume: 0.45,
    });
    created.sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        created.sound.unloadAsync();
      }
    });
    await created.sound.playAsync();
  }

  function changeStat(stat: StatName, delta: number) {
    setStats((current) => {
      const nextValue = current[stat] + delta;
      if (nextValue < BASE[stat]) {
        return current;
      }
      if (delta > 0 && remaining <= 0) {
        return current;
      }
      Vibration.vibrate(40);
      return { ...current, [stat]: nextValue };
    });
  }

  async function pickPicture() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  }

  const barColor = remaining <= 3 ? "#b42318" : "#2f7d32";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hero generation</Text>
      <Pressable style={styles.row} onHoverIn={playHover}>
        <Text style={styles.label}>Hero name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter a name"
          placeholderTextColor="#6b5344"
        />
      </Pressable>
      <Pressable style={styles.row} onHoverIn={playHover} onPress={() => setOpenClass(true)}>
        <Text style={styles.label}>Hero class</Text>
        <Text style={styles.value}>{heroClass}</Text>
      </Pressable>
      {STATS.map((stat) => (
        <Pressable key={stat} style={styles.row} onHoverIn={playHover}>
          <Text style={styles.label}>{stat}</Text>
          <Pressable style={styles.step} onPress={() => changeStat(stat, -1)}>
            <Text style={styles.stepText}>-</Text>
          </Pressable>
          <Text style={styles.value}>{stats[stat]}</Text>
          <Pressable style={styles.step} onPress={() => changeStat(stat, 1)}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </Pressable>
      ))}
      <View style={styles.track}>
        <View
          style={[
            styles.bar,
            { width: `${(remaining / POOL) * 100}%`, backgroundColor: barColor },
          ]}
        />
      </View>
      <Text style={styles.hint}>{remaining} points left</Text>
      <Pressable style={styles.secondary} onPress={pickPicture} onHoverIn={playHover}>
        <Text style={styles.secondaryText}>Choose a portrait</Text>
      </Pressable>
      {picture ? <Image source={{ uri: picture }} style={styles.portrait} /> : null}
      <Pressable
        style={[styles.generate, !ready && styles.generateDisabled]}
        disabled={!ready}
        onPress={() => {
          if (!ready) {
            return;
          }
          hero.name = name.trim();
          hero.heroClass = heroClass;
          hero.strength = stats.strength;
          hero.stamina = stats.stamina;
          hero.agility = stats.agility;
          hero.magic = stats.magic;
          setSummary(true);
        }}
      >
        <Text style={styles.generateText}>Generate!</Text>
      </Pressable>
      <Modal visible={openClass} transparent animationType="fade">
        <View style={styles.modalShade}>
          <View style={styles.modalCard}>
            {CLASSES.map((item) => (
              <Pressable
                key={item}
                style={styles.classRow}
                onPress={() => {
                  setHeroClass(item);
                  setOpenClass(false);
                }}
              >
                <Text style={styles.value}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
      <Modal visible={summary} transparent animationType="slide">
        <View style={styles.modalShade}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>{hero.name}</Text>
            {picture ? <Image source={{ uri: picture }} style={styles.portrait} /> : null}
            <Text style={styles.value}>Class: {hero.heroClass}</Text>
            <Text style={styles.value}>Strength: {hero.strength}</Text>
            <Text style={styles.value}>Stamina: {hero.stamina}</Text>
            <Text style={styles.value}>Agility: {hero.agility}</Text>
            <Text style={styles.value}>Magic: {hero.magic}</Text>
            <Pressable style={styles.generate} onPress={() => setSummary(false)}>
              <Text style={styles.generateText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    width: 110,
    textTransform: "capitalize",
  },
  input: {
    flex: 1,
    backgroundColor: "burlywood",
    color: "black",
    borderColor: "brown",
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  value: {
    color: "#fff",
    fontSize: 18,
    textTransform: "capitalize",
  },
  step: {
    backgroundColor: "#841584",
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  stepText: {
    color: "#fff",
    fontSize: 22,
  },
  track: {
    width: "100%",
    height: 14,
    backgroundColor: "#3a3f46",
    borderRadius: 7,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
  hint: {
    color: "#fff",
    alignSelf: "flex-start",
  },
  secondary: {
    borderWidth: 1,
    borderColor: "burlywood",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  secondaryText: {
    color: "burlywood",
  },
  portrait: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  generate: {
    backgroundColor: "burlywood",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateDisabled: {
    opacity: 0.4,
  },
  generateText: {
    color: "#3a2412",
    fontWeight: "700",
    fontSize: 18,
  },
  modalShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#25292e",
    borderRadius: 12,
    padding: 20,
    gap: 10,
    alignItems: "center",
  },
  classRow: {
    paddingVertical: 8,
  },
});
