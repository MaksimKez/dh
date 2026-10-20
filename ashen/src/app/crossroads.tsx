import { Text } from "react-native";

import { StoryScreen } from "@/components/story-screen";

export default function CrossroadsScreen() {
  return (
    <StoryScreen
      image={require("../../assets/story/crossroads.jpg")}
      title="The Crossroads"
      choices={[
        { label: "Follow the lantern path", href: "/tower" },
        { label: "Enter the ruined chapel", href: "/chapel" },
      ]}
    >
      <Text style={copy}>
        Lanterns burn along the left road, climbing toward a tower that should have fallen years ago.
      </Text>
      <Text style={copy}>
        The right road drops into a chapel with a broken roof. Something inside is counting your steps.
      </Text>
    </StoryScreen>
  );
}

const copy = {
  color: "#f7f1e3",
  fontSize: 16,
  lineHeight: 24,
};
