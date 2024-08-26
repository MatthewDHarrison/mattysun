export enum DiceType {
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D20 = 20,
}

export interface IDice {
  dice: DiceType[];
  modifier: number;
}

export const rollDice = (dice: IDice): number => {
  return (
    dice.dice.reduce(
      (acc, die) => acc + Math.floor(Math.random() * die) + 1,
      0,
    ) + dice.modifier
  );
};

export const getDiceString = (dice: IDice): string => {
  const sign = dice.modifier >= 0 ? "+" : "";
  return `D${dice.dice.join("+")}${sign}${dice.modifier}`;
};
