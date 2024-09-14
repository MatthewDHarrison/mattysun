import { IStats } from "./character/character";
import { IDice } from "./dice";

export enum ItemType {
  Weapon,
  Armor,
  Consumable,
  Scroll,
  Misc,
}

export type Stat = keyof IStats;

export interface IItem {
  name: string;
  description: string;
  value: number;
  type: ItemType;
}

export enum RangeType {
  Melee = "melee",
  Ranged = "ranged",
}

export interface IWeapon extends IItem {
  damage: IDice;
  range: RangeType;
  tag?: string;
}

export interface IArmor extends IItem {
  defense: number;
}

export interface IConsumable extends IItem {
  effect: IEffect;
}

export interface IScroll extends IItem {
  spell: string;
  damage?: IDice;
  effect?: IEffect;
}

export type Item = IWeapon | IArmor | IConsumable | IScroll;

export enum EffectType {
  Health,
  Coin,
  Item,
  Stat,
  Status,
}

export enum StatusType {
  Poison,
  Stun,
  Turned,
  Invisible,
  Invincible,
  Weak,
  Strong,
}

export interface IEffect {
  type: EffectType;
  value?: number;
  dice?: IDice;
  sign?: number;
  status?: StatusType;
  target: string | "self" | "enemies" | "all";
}
