export type HeroClass = "warrior" | "paladin" | "sorcerer";

export class Hero {
  name = "";
  heroClass: HeroClass = "warrior";
  strength = 3;
  stamina = 4;
  agility = 2;
  magic = 1;

  constructor() {
    this.name = "";
    this.heroClass = "warrior";
  }
}
