import { createContext, useState, type ReactNode } from "react";

export type ThemeName = "light" | "dark";

export type ThemeColors = {
  background: string;
  text: string;
  title: string;
  button: string;
  shade: string;
};

const palettes: Record<ThemeName, ThemeColors> = {
  light: {
    background: "#f4efe4",
    text: "#2a2118",
    title: "#6b3e16",
    button: "#6b3e16",
    shade: "rgba(244, 239, 228, 0.72)",
  },
  dark: {
    background: "#141821",
    text: "#f7f1e3",
    title: "#f3e6c5",
    button: "#8b3a3a",
    shade: "rgba(10, 12, 18, 0.55)",
  },
};

type ThemeValue = {
  name: ThemeName;
  colors: ThemeColors;
  setTheme: (name: ThemeName) => void;
};

export const ThemeContext = createContext<ThemeValue>({
  name: "dark",
  colors: palettes.dark,
  setTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [name, setTheme] = useState<ThemeName>("dark");
  return (
    <ThemeContext.Provider value={{ name, colors: palettes[name], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
