import { Encounter, EncounterType, RewardType } from "../encounter";
import { v4 } from "uuid";
import { EffectType } from "../general";

export const encounters: Encounter[] = [
  {
    name: "Goblin Ambush",
    description: "A group of goblins ambushes you!",
    difficulty: 1,
    rewards: [{ type: RewardType.Coin, value: 10 }],
    type: EncounterType.Combat,
    enemies: [
      {
        id: v4(),
        name: "Gay lil guy",
        hp: 5,
        maxHp: 5,
        defense: 4,
        morale: 5,
        options: [
          {
            description: "The goblin thrusts clumsily with a rusty knife.",
            onSuccess: [],
            stat: "toughness",
            difficulty: 4,
            onFail: [{ type: EffectType.Health, target: "self", value: 1 }],
          },
        ],
        special: "None",
      },
      {
        id: v4(),
        name: "Gay lil guy",
        hp: 5,
        maxHp: 5,
        defense: 4,
        morale: 5,
        options: [
          {
            description: "The goblin thrusts clumsily with a rusty knife.",
            onSuccess: [],
            stat: "toughness",
            difficulty: 4,
            onFail: [{ type: EffectType.Health, target: "self", value: 1 }],
          },
        ],
        special: "None",
      },
      {
        id: v4(),
        name: "Gay lil guy",
        hp: 5,
        maxHp: 5,
        defense: 4,
        morale: 5,
        options: [
          {
            description: "The goblin thrusts clumsily with a rusty knife.",
            onSuccess: [],
            stat: "toughness",
            difficulty: 4,
            onFail: [{ type: EffectType.Health, target: "self", value: 1 }],
          },
        ],
        special: "None",
      },
    ],
  },
];
