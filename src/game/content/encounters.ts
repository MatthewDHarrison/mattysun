import { Encounter, EncounterType, RewardType } from "../encounter";
import { v4 } from "uuid";
import { EffectType } from "../general";
import { DiceType } from "../dice";

export const encounters: Encounter[] = [
  {
    name: "Skeletal Ambush",
    description: "A shambling remnant of some unlucky soldier.",
    difficulty: 1,
    rewards: [{ type: RewardType.Coin, value: 10 }],
    type: EncounterType.Combat,
    enemies: [
      {
        id: v4(),
        name: "Skeleton Warrior",
        hp: 100,
        maxHp: 100,
        defense: 4,
        morale: 5,
        options: [
          {
            description: "The skeleton swings his bloody axe.",
            onSuccess: [],
            stat: "toughness",
            difficulty: 7,
            onFail: [
              {
                type: EffectType.Health,
                target: "self",
                dice: { dice: [DiceType.D6], modifier: 0 },
              },
            ],
          },
        ],
        special: "None",
      },
    ],
  },
];
