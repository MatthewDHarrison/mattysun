import { Encounter, EncounterType, RewardType } from "../encounter";

export const encounters: Encounter[] = [
  {
    name: "Goblin Ambush",
    description: "A group of goblins ambushes you!",
    difficulty: 1,
    rewards: [{ type: RewardType.Coin, value: 10 }],
    type: EncounterType.Combat,
    enemies: [
      {
        name: "Goblin",
        hp: 5,

        maxHp: 5,
        morale: 5,
        damage: { dice: [4], modifier: 0 },
        special: "None",
      },
    ],
  },
  {
    name: "Orc Raiding Party",
    description: "A group of orcs is raiding the area!",
    difficulty: 2,
    rewards: [{ type: RewardType.Coin, value: 15 }],
    type: EncounterType.Combat,
    enemies: [
      {
        name: "Orc",
        hp: 10,
        maxHp: 10,
        morale: 10,
        damage: { dice: [6], modifier: 0 },
        special: "None",
      },
    ],
  },
  {
    name: "Troll Attack",
    description: "A troll is attacking the road!",
    difficulty: 3,
    rewards: [{ type: RewardType.Coin, value: 20 }],
    type: EncounterType.Combat,
    enemies: [
      {
        name: "Troll",
        hp: 15,
        maxHp: 15,
        morale: 15,
        damage: { dice: [8], modifier: 0 },
        special: "Regenerates 5 HP per turn",
      },
    ],
  },
];
