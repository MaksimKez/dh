import { Href, router } from "expo-router";
import { useContext, type ReactNode } from "react";
import { Button, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "@/context/theme-context";
import { playClick } from "@/audio";

type Choice = {
  label: string;
  href: Href;
};

type StoryScreenProps = {
  image: ImageSourcePropType;
  title: string;
  children: ReactNode;
  choices: Choice[];
};

export function StoryScreen({ image, title, children, choices }: StoryScreenProps) {
  const { colors } = useContext(ThemeContext);

  async function open(href: Href) {
    await playClick();
    router.push(href);
  }

  return (
    <ScrollView contentContainerStyle={[styles.page, { backgroundColor: colors.background }]}>
      <Image source={image} style={styles.image} />
      <Text style={[styles.title, { color: colors.title }]}>{title}</Text>
      <View style={styles.copy}>{children}</View>
      <View style={styles.choices}>
        {choices.map((choice) => (
          <Button key={choice.href.toString() + choice.label} title={choice.label} onPress={() => open(choice.href)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
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
    gap: 10,
  },
  choices: {
    gap: 10,
  },
});
