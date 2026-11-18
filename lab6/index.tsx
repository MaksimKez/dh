import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ScreenOrientation from "expo-screen-orientation";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Info = {
  title: string;
  version: string;
  error: string;
};

export default function StartScreen() {
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ Cinzel_700Bold });
  const [info, setInfo] = useState<Info>({ title: "", version: "", error: "" });
  const [started, setStarted] = useState(false);
  const travel = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => undefined);
  }, []);

  useEffect(() => {
    async function readInfo() {
      try {
        const asset = Asset.fromModule(require("./assets/info.txt"));
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        if (!uri) {
          throw new Error("missing");
        }
        const raw = await FileSystem.readAsStringAsync(uri);
        const lines = raw
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);
        if (lines.length < 2) {
          throw new Error("invalid");
        }
        setInfo({ title: lines[0], version: lines[1], error: "" });
      } catch {
        setInfo({
          title: "",
          version: "",
          error: "The title file is missing or invalid.",
        });
      }
    }
    readInfo();
  }, []);

  useEffect(() => {
    const fly = () => {
      const peak = 40 + Math.random() * Math.max(80, height * 0.35);
      travel.setValue(0);
      lift.setValue(peak);
      Animated.timing(travel, {
        toValue: 1,
        duration: 2800 + Math.random() * 1200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start();
    };
    fly();
    const timer = setInterval(fly, 5000);
    return () => clearInterval(timer);
  }, [height, lift, travel]);

  if (!fontsLoaded) {
    return null;
  }

  const translateX = travel.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, width + 40],
  });
  const translateY = travel.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -30, 10],
  });

  return (
    <ImageBackground
      source={require("./assets/medieval_wood.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.row}>
        <LottieView source={require("./assets/torch.json")} autoPlay loop style={styles.torch} />
        <View style={styles.content}>
          <Animated.Text
            style={[
              styles.dragon,
              { transform: [{ translateX }, { translateY }] },
            ]}
          >
            🐉
          </Animated.Text>
          {info.error ? (
            <Text style={styles.error}>{info.error}</Text>
          ) : (
            <>
              <Text style={styles.title}>{info.title}</Text>
              <Text style={styles.version}>Version {info.version}</Text>
            </>
          )}
          <Pressable
            onPress={() => setStarted(true)}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Start game</Text>
          </Pressable>
          {started ? <Text style={styles.version}>The gate is open.</Text> : null}
        </View>
        <LottieView source={require("./assets/torch.json")} autoPlay loop style={styles.torch} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  torch: {
    width: 70,
    height: 150,
  },
  content: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  title: {
    color: "#D4AF37",
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Cinzel_700Bold",
  },
  version: {
    color: "#F5DEB3",
    fontSize: 18,
    fontFamily: "Cinzel_700Bold",
  },
  error: {
    color: "#ffb4a8",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Cinzel_700Bold",
  },
  button: {
    backgroundColor: "#6b3e16",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.75,
  },
  buttonText: {
    color: "#F5DEB3",
    fontSize: 18,
    fontFamily: "Cinzel_700Bold",
  },
  dragon: {
    position: "absolute",
    top: 30,
    left: 0,
    color: "#f3e6c5",
    fontSize: 22,
    fontFamily: "Cinzel_700Bold",
  },
});
