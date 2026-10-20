import { Text } from "react-native";

import { StoryScreen } from "@/components/story-screen";

export default function TowerScreen() {
  return (
    <StoryScreen
      image={require("../../assets/story/tower.jpg")}
      title="The Forgotten Tower"
      choices={[{ label: "Climb back to the gate", href: "/" }]}
    >
      <Text style={copy}>
        The stair ends at a cold window. From here the gate is a small gold line, and the chapel bell rings once below.
      </Text>
      <Text style={copy}>
        No door leads onward. The only honest choice is to return and pick the other road.
      </Text>
    </StoryScreen>
  );
}

const copy = {
  color: "#f7f1e3",
  fontSize: 16,
  lineHeight: 24,
};
