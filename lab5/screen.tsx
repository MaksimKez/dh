import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./theme";

export default function WelcomeScreen() {
  const { t, i18n } = useTranslation();
  const { colors, toggleTheme } = useContext(ThemeContext);
  const [playerName, setPlayerName] = useState("");

  const toggleLanguage = () => {
    const next = i18n.language.startsWith("ru") ? "en" : "ru";
    i18n.changeLanguage(next);
  };

  const name = playerName.trim();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("title")}</Text>
      {name !== "" && (
        <Text style={[styles.greeting, { color: colors.text }]}>
          {t("greeting", { name })}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.input,
            borderColor: colors.border,
          },
        ]}
        placeholder={t("namePlaceholder")}
        placeholderTextColor={colors.placeholder}
        value={playerName}
        onChangeText={setPlayerName}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={toggleLanguage}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          {t("changeLanguage")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          {t("changeTheme")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    width: "85%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: "85%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
