import { router, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { CharacterContext, type CharacterClass } from "@/context/character-context";
import { ThemeContext, type ThemeName } from "@/context/theme-context";
import { useGameText } from "@/hooks/use-game-text";
import { useTranslation } from "react-i18next";

const CLASSES: CharacterClass[] = ["warrior", "paladin", "sorcerer"];

export default function WelcomeScreen() {
  const text = useGameText();
  const { i18n } = useTranslation();
  const { name, colors, setTheme } = useContext(ThemeContext);
  const character = useContext(CharacterContext);
  const [playerName, setPlayerName] = useState(character.name);

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: text("welcomeTitle"), headerTintColor: colors.title }} />
      <Text style={[styles.title, { color: colors.title }]}>{text("welcomeTitle")}</Text>
      <Text style={[styles.copy, { color: colors.text }]}>{text("welcomeLead")}</Text>
      <Text style={[styles.copy, { color: colors.text }]}>{text("greeting")}</Text>
      <Text style={[styles.label, { color: colors.text }]}>{text("nameLabel")}</Text>
      <TextInput
        value={playerName}
        onChangeText={(value) => {
          setPlayerName(value);
          character.setName(value);
        }}
        placeholder={text("namePlaceholder")}
        placeholderTextColor={name === "dark" ? "#9aa1ad" : "#8a8f98"}
        style={[styles.input, { color: colors.text, borderColor: colors.title }]}
      />
      <Text style={[styles.label, { color: colors.text }]}>{text("classLabel")}</Text>
      <View style={styles.row}>
        {CLASSES.map((item) => (
          <Pressable
            key={item}
            onPress={() => character.setCharacterClass(item)}
            style={[
              styles.chip,
              { borderColor: colors.title },
              character.characterClass === item && { backgroundColor: colors.title },
            ]}
          >
            <Text
              style={{
                color: character.characterClass === item ? colors.background : colors.text,
              }}
            >
              {text(item)}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{text("languageLabel")}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => i18n.changeLanguage("en")}
          style={[styles.chip, { borderColor: colors.title }, i18n.language.startsWith("en") && { backgroundColor: colors.title }]}
        >
          <Text style={{ color: i18n.language.startsWith("en") ? colors.background : colors.text }}>English</Text>
        </Pressable>
        <Pressable
          onPress={() => i18n.changeLanguage("pl")}
          style={[styles.chip, { borderColor: colors.title }, i18n.language.startsWith("pl") && { backgroundColor: colors.title }]}
        >
          <Text style={{ color: i18n.language.startsWith("pl") ? colors.background : colors.text }}>Polski</Text>
        </Pressable>
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{text("themeLabel")}</Text>
      <View style={styles.row}>
        {(["light", "dark"] as ThemeName[]).map((item) => (
          <Pressable
            key={item}
            onPress={() => setTheme(item)}
            style={[styles.chip, { borderColor: colors.title }, name === item && { backgroundColor: colors.title }]}
          >
            <Text style={{ color: name === item ? colors.background : colors.text }}>{text(item)}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={[styles.enter, { backgroundColor: colors.title }]} onPress={() => router.push("/gate")}>
        <Text style={[styles.enterText, { color: colors.background }]}>{text("enter")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 24,
    gap: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Cinzel_700Bold",
  },
  copy: {
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Cinzel_700Bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  enter: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  enterText: {
    fontFamily: "Cinzel_700Bold",
    fontSize: 16,
  },
});
