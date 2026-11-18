import { Stack } from "expo-router";

import { StoryScreen } from "@/components/story-screen";
import { StoryText } from "@/components/story-text";
import { useGameText } from "@/hooks/use-game-text";

export default function CrossroadsScreen() {
  const text = useGameText();

  return (
    <StoryScreen
      image={require("../../assets/story/crossroads.jpg")}
      title={text("crossroadsTitle")}
      choices={[
        { label: text("lanternPath"), href: "/tower" },
        { label: text("enterChapel"), href: "/chapel" },
      ]}
    >
      <Stack.Screen options={{ title: text("screenCrossroads") }} />
      <StoryText>{text("crossroadsA")}</StoryText>
      <StoryText>{text("crossroadsB")}</StoryText>
    </StoryScreen>
  );
}
