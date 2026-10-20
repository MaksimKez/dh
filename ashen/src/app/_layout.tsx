import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Cinzel_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#141821" },
        headerTintColor: "#f3e6c5",
        headerTitleStyle: { fontFamily: "Cinzel_700Bold" },
        contentStyle: { backgroundColor: "#141821" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Ashen Gate" }} />
      <Stack.Screen name="crossroads" options={{ title: "Crossroads" }} />
      <Stack.Screen name="market" options={{ title: "Night Market" }} />
      <Stack.Screen name="tower" options={{ title: "Forgotten Tower" }} />
      <Stack.Screen name="chapel" options={{ title: "Chapel" }} />
      <Stack.Screen name="victory" options={{ title: "Victory" }} />
      <Stack.Screen name="death" options={{ title: "Defeat" }} />
    </Stack>
  );
}
