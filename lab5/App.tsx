import "./i18n";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import WelcomeScreen from "./screen";
import { ThemeContext, ThemeProvider } from "./theme";

function Root() {
  const { name } = useContext(ThemeContext);

  return (
    <>
      <WelcomeScreen />
      <StatusBar style={name === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
