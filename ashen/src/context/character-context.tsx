import { createContext, useState, type ReactNode } from "react";

export type CharacterClass = "warrior" | "paladin" | "sorcerer";

type Character = {
  name: string;
  characterClass: CharacterClass;
  hp: number;
  inventory: string[];
  setName: (name: string) => void;
  setCharacterClass: (characterClass: CharacterClass) => void;
};

export const CharacterContext = createContext<Character>({
  name: "",
  characterClass: "warrior",
  hp: 10,
  inventory: ["lantern", "dice"],
  setName: () => undefined,
  setCharacterClass: () => undefined,
});

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState<CharacterClass>("warrior");
  const [hp] = useState(10);
  const [inventory] = useState(["lantern", "dice"]);

  return (
    <CharacterContext.Provider
      value={{ name, characterClass, hp, inventory, setName, setCharacterClass }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
