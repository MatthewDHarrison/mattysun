import { Encounter, EncounterType, RewardType } from "../encounter";
import { v4 } from "uuid";
import { EffectType } from "../general";

export const encounters: Encounter[] = [
  {
    name: "Skeleton Warrior",
    description: "A shambling remnant of some unlucky soldier.",
    difficulty: 1,
    rewards: [{ type: RewardType.Coin, value: 10 }],
    type: EncounterType.Combat,
    enemies: [
      {
        id: v4(),
        name: "Skeleton Warrior",
        hp: 10,
        maxHp: 10,
        defense: 4,
        morale: 5,
        options: [
          {
            description: "The skeleton swings his bloody axe.",
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
