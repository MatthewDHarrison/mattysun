import { IOption } from "./encounter";

export interface IMonster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  defense: number;
  morale: number;
  options: IOption[];
  special: string;
}
