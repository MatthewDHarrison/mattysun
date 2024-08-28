import { IDice } from "./dice";

export interface IMonster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  defense: number;
  morale: number;
  damage: IDice;
  special: string;
}
