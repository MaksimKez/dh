import { StoryScreen } from "@/components/story-screen";
import { StoryText } from "@/components/story-text";
import { useGameText } from "@/hooks/use-game-text";

export default function DeathScreen() {
  const text = useGameText();

  return (
    <StoryScreen
      image={require("../../assets/story/death.jpg")}
      title={text("deathTitle")}
      choices={[{ label: text("beginAgain"), href: "/gate" }]}
    >
      <StoryText>{text("greeting")}</StoryText>
      <StoryText>{text("deathBody")}</StoryText>
    </StoryScreen>
  );
}
