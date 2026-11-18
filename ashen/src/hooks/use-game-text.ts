import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { CharacterContext } from "@/context/character-context";

export function useGameText() {
  const { t } = useTranslation();
  const character = useContext(CharacterContext);

  return (key: string, extra?: Record<string, string>) => {
    const values: Record<string, string> = {
      playerName: character.name.trim() || t("fallbackName"),
      hp: String(character.hp),
      items: character.inventory.join(", "),
      ...extra,
    };
    return Object.entries(values).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, value),
      t(key)
    );
  };
}
