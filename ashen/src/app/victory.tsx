import { StoryScreen } from "@/components/story-screen";
import { StoryText } from "@/components/story-text";
import { useGameText } from "@/hooks/use-game-text";

export default function VictoryScreen() {
  const text = useGameText();

  return (
    <StoryScreen
      image={require("../../assets/story/victory.jpg")}
      title={text("victoryTitle")}
      choices={[{ label: text("returnGate"), href: "/gate" }]}
    >
      <StoryText>{text("greeting")}</StoryText>
      <StoryText>{text("victoryBody")}</StoryText>
    </StoryScreen>
  );
}
