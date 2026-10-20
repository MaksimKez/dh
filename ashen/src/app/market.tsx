import { Text } from "react-native";

import { StoryScreen } from "@/components/story-screen";

export default function MarketScreen() {
  return (
    <StoryScreen
      image={require("../../assets/story/market.jpg")}
      title="The Night Market"
      choices={[
        { label: "Return to the gate", href: "/" },
        { label: "Follow the merchant", href: "/chapel" },
      ]}
    >
      <Text style={copy}>
        Hooded traders sell maps that change when you blink. One merchant offers a shorter way, if you can pay with courage.
      </Text>
      <Text style={copy}>
        He points between the stalls, toward the same ruined chapel the forest has been hiding.
      </Text>
    </StoryScreen>
  );
}

const copy = {
  color: "#f7f1e3",
  fontSize: 16,
  lineHeight: 24,
};
