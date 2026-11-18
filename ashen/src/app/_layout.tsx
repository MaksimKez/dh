import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";

import { CharacterProvider } from "@/context/character-context";
import { ThemeContext, ThemeProvider } from "@/context/theme-context";
import { useGameText } from "@/hooks/use-game-text";
import "@/i18n";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const { colors } = useContext(ThemeContext);
  const text = useGameText();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.title,
        headerTitleStyle: { fontFamily: "Cinzel_700Bold" },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: text("welcomeTitle") }} />
      <Stack.Screen name="gate" options={{ title: text("screenGate") }} />
      <Stack.Screen name="crossroads" options={{ title: text("screenCrossroads") }} />
      <Stack.Screen name="market" options={{ title: text("screenMarket") }} />
      <Stack.Screen name="tower" options={{ title: text("screenTower") }} />
      <Stack.Screen name="chapel" options={{ title: text("screenChapel") }} />
      <Stack.Screen name="victory" options={{ title: text("screenVictory") }} />
      <Stack.Screen name="death" options={{ title: text("screenDeath") }} />
    </Stack>
  );
}

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
    <ThemeProvider>
      <CharacterProvider>
        <Navigation />
      </CharacterProvider>
    </ThemeProvider>
  );
}
