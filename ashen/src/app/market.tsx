import { StoryScreen } from "@/components/story-screen";
import { StoryText } from "@/components/story-text";
import { useGameText } from "@/hooks/use-game-text";

export default function MarketScreen() {
  const text = useGameText();

  return (
    <StoryScreen
      image={require("../../assets/story/market.jpg")}
      title={text("marketTitle")}
      choices={[
        { label: text("returnGate"), href: "/gate" },
        { label: text("followMerchant"), href: "/chapel" },
      ]}
    >
      <StoryText>{text("marketA")}</StoryText>
      <StoryText>{text("marketB")}</StoryText>
    </StoryScreen>
  );
}
