import { Text } from "react-native";

import { StoryScreen } from "@/components/story-screen";

export default function VictoryScreen() {
  return (
    <StoryScreen
      image={require("../../assets/story/victory.jpg")}
      title="Victory"
      choices={[{ label: "Return to the gate", href: "/" }]}
    >
      <Text style={copy}>
        Dawn finds the valley quiet. The warden is gone, and the Ashen Gate no longer asks you to choose.
      </Text>
    </StoryScreen>
  );
}

const copy = {
  color: "#f7f1e3",
  fontSize: 16,
  lineHeight: 24,
};
