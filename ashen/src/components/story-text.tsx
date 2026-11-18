import { useContext, type ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function StoryText({ children }: { children: ReactNode }) {
  const { colors } = useContext(ThemeContext);
  return <Text style={[styles.copy, { color: colors.text }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  copy: {
    fontSize: 16,
    lineHeight: 24,
  },
});
