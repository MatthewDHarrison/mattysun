import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { IArmor, IItem, Item, IWeapon } from "../general";

export interface IStats {
  strength: number;
  agility: number;
  presence: number;
  toughness: number;
}

export interface ICharacter {
  name: string;
  hp: number;
  stats: IStats;
  items: Item[];
  coin: number;
}

export interface IEquippedItems {
  melee: IWeapon | null;
  ranged: IWeapon | null;
  armor: IArmor | null;
}

export const useCharacter = () => {
  const [characterStorage, setCharacterStorage] =
    useLocalStorage<ICharacter | null>("character", null);

  const [character, setCharacter] = useState<ICharacter | null | undefined>(
    characterStorage,
  );

  const createCharacter = (name: string) => {
    setCharacter({
      name: name,
      hp: 30,
      stats: {
        strength: 0,
        agility: 0,
        presence: 0,
        toughness: 0,
      },
      items: [],
      coin: 0,
    });
  };

  useEffect(() => {
    setCharacterStorage(character);
  }, [character, setCharacterStorage]);

  return {
    character,
    createCharacter,
    setCharacter,
  };
};

export const useEquippedItems = (character: ICharacter) => {
  const [equippedItems, setEquippedItems] = useLocalStorage<IEquippedItems>(
    "equipped_items",
    {
      melee: null,
      ranged: null,
      armor: null,
    },
  );

  return {
    equippedItems,
    setEquippedItems,
  };
};
