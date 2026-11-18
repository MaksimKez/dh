import { StoryScreen } from "@/components/story-screen";
import { StoryText } from "@/components/story-text";
import { useGameText } from "@/hooks/use-game-text";

export default function TowerScreen() {
  const text = useGameText();

  return (
    <StoryScreen
      image={require("../../assets/story/tower.jpg")}
      title={text("towerTitle")}
      choices={[{ label: text("climbBack"), href: "/gate" }]}
    >
      <StoryText>{text("towerA")}</StoryText>
      <StoryText>{text("towerB")}</StoryText>
    </StoryScreen>
  );
}
