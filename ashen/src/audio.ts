import { Audio, AVPlaybackStatus } from "expo-av";

let theme: Audio.Sound | null = null;
let starting = false;

export async function startTheme() {
  if (starting) {
    return;
  }
  starting = true;
  try {
    if (theme) {
      const status = await theme.getStatusAsync();
      if (status.isLoaded && !status.isPlaying) {
        await theme.playAsync();
      }
      return;
    }
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    const created = await Audio.Sound.createAsync(require("../assets/story/theme.wav"), {
      isLooping: true,
      volume: 0.35,
    });
    theme = created.sound;
    await theme.playAsync();
  } finally {
    starting = false;
  }
}

export async function playClick() {
  await startTheme().catch(() => undefined);
  const created = await Audio.Sound.createAsync(require("../assets/story/click.wav"), {
    volume: 0.6,
  });
  created.sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      created.sound.unloadAsync();
    }
  });
  await created.sound.playAsync();
}
