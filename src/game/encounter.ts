import { IEffect, Item } from "./general";
import { IMonster } from "./monster";

export enum EncounterType {
  Combat,
  Mystery,
}

export enum RewardType {
  Coin,
  Item,
}

type Reward = {
  type: RewardType;
  value: number;
  item?: Item;
};

export interface IEncounter {
  name: string;
  description: string;
  difficulty: number;
  rewards: Reward[];
  type: EncounterType;
}

export interface ICombatEncounter extends IEncounter {
  enemies: IMonster[];
}

export interface IMysteryOption {
  description: string;
  effects: IEffect[];
}

export interface IMysteryEncounter extends IEncounter {
  options: IMysteryOption[];
}

export type Encounter = ICombatEncounter | IMysteryEncounter;
