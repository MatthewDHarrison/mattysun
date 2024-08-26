import { IDice } from "./dice";

export interface IMonster {
  name: string;
  hp: number;
  maxHp: number;
  morale: number;
  damage: IDice;
  special: string;
}
