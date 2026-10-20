import { Text } from "react-native";

import { StoryScreen } from "@/components/story-screen";

export default function DeathScreen() {
  return (
    <StoryScreen
      image={require("../../assets/story/death.jpg")}
      title="Death"
      choices={[{ label: "Begin again at the gate", href: "/" }]}
    >
      <Text style={copy}>
        The dice were lower than the warden's. The chapel keeps your name, until you walk through the gate once more.
      </Text>
    </StoryScreen>
  );
}

const copy = {
  color: "#f7f1e3",
  fontSize: 16,
  lineHeight: 24,
};
