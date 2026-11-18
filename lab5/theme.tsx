import { createContext, useState, type ReactNode } from "react";

export type ThemeName = "light" | "dark";

type ThemeColors = {
  background: string;
  text: string;
  input: string;
  border: string;
  placeholder: string;
  button: string;
  buttonText: string;
};

const palettes: Record<ThemeName, ThemeColors> = {
  light: {
    background: "#f4f6f8",
    text: "#1c1c1c",
    input: "#ffffff",
    border: "#cccccc",
    placeholder: "#8a8f98",
    button: "#6c757d",
    buttonText: "#ffffff",
  },
  dark: {
    background: "#121418",
    text: "#f4f1ea",
    input: "#1c1f26",
    border: "#3a3f4b",
    placeholder: "#9aa1ad",
    button: "#3d4450",
    buttonText: "#ffffff",
  },
};

type ThemeValue = {
  name: ThemeName;
  colors: ThemeColors;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeValue>({
  name: "light",
  colors: palettes.light,
  toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<ThemeName>("light");

  const toggleTheme = () => {
    setName((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ name, colors: palettes[name], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
