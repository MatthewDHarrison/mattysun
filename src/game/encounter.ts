import { IEffect, Item, Stat } from "./general";
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

export interface IOption {
  description: string;
  stat?: Stat;
  difficulty?: number;
  onSuccess: IEffect[];
  onFail: IEffect[];
}

export interface IMysteryEncounter extends IEncounter {
  options: IOption[];
}

export type Encounter = ICombatEncounter | IMysteryEncounter;
