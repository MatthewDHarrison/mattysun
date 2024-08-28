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

const resultOdds = Array.from({ length: 11 }, (_, i) => i + 1).map((i) => {
  const numerator = i > 6 ? 12 - i : i;
  return numerator / 36;
});

const successOdds = resultOdds
  .reverse()
  .reduce(
    (acc, odds) => {
      acc.push(acc[acc.length - 1] + odds);
      return acc;
    },
    [0],
  )
  .reverse();

export const getSuccessChance = (
  modifier: number,
  difficulty: number,
): number => {
  const index = difficulty - modifier - 2;
  if (index < 0) {
    return 1;
  }

  return successOdds[index];
};
