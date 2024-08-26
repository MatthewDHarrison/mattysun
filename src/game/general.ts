import { IDice } from "./dice";

export enum ItemType {
  Weapon,
  Armor,
  Consumable,
  Scroll,
  Misc,
}

export interface IItem {
  name: string;
  description: string;
  value: number;
  type: ItemType;
}

export interface IWeapon extends IItem {
  damage: IDice;
  range: "melee" | "ranged";
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
  target?: string;
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
  status?: StatusType;
}
