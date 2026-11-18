import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type EnemyProps = {
  name: string;
  strength: number;
  stamina: number;
  image: ImageSourcePropType;
};

export function Enemy({ name, strength, stamina, image }: EnemyProps) {
  const [currentStamina, setCurrentStamina] = useState(stamina);

  useEffect(() => {
    setCurrentStamina(stamina);
  }, [stamina]);

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.line}>Strength {strength}</Text>
      <Text style={styles.line}>Stamina {currentStamina}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: 4,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 8,
  },
  name: {
    color: "#f3e6c5",
    fontSize: 22,
    fontWeight: "700",
  },
  line: {
    color: "#f7f1e3",
    fontSize: 16,
  },
});
