import { Href, router } from "expo-router";
import { ReactNode } from "react";
import { Button, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";

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
  async function open(href: Href) {
    await playClick();
    router.push(href);
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.copy}>{children}</View>
      <View style={styles.choices}>
        {choices.map((choice) => (
          <Button key={choice.label} title={choice.label} onPress={() => open(choice.href)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    gap: 16,
    backgroundColor: "#141821",
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
    gap: 10,
  },
  choices: {
    gap: 10,
  },
});
