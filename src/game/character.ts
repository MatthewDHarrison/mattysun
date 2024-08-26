import { useState } from "react";
import { useLocalStorage } from "react-use";
import { IItem, Item } from "./general";

export interface ICharacter {
  name: string;
  hp: number;
  strength: number;
  agility: number;
  presence: number;
  toughness: number;
  items: Item[];
  coin: number;
}

export const useCharacter = () => {
  const [character, setCharacter] = useLocalStorage<ICharacter | null>(
    "character",
    null,
  );

  const createCharacter = (name: string) => {
    setCharacter({
      name: name,
      hp: 30,
      strength: 0,
      agility: 0,
      presence: 0,
      toughness: 0,
      items: [],
      coin: 0,
    });
  };

  return {
    character,
    createCharacter,
    setCharacter,
  };
};
