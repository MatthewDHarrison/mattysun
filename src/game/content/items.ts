import {
  IWeapon,
  IScroll,
  ItemType,
  EffectType,
  StatusType,
  IItem,
  Item,
  RangeType,
} from "../general";
import { DiceType, IDice } from "../dice";

export const startingGear: Item[] = [
  {
    name: "Dagger",
    description: "A small knife.",
    value: 5,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D4], modifier: 0 },
    range: RangeType.Melee,
  },
  {
    name: "Leather Sling",
    description: "A small pouch and some stones.",
    value: 3,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D4], modifier: 0 },
    range: RangeType.Ranged,
  },
  {
    name: "Questionable Jerky",
    description: "Not sure what it's made of, but it's protein.",
    value: 1,
    type: ItemType.Consumable,
    effect: { type: EffectType.Health, value: 8, target: "self", sign: 1 },
  },
  {
    name: "Bruised Apple",
    description: "It's seen better days. So have you.",
    value: 1,
    type: ItemType.Consumable,
    effect: { type: EffectType.Health, value: 4, target: "self", sign: 1 },
  },
];

export const meleeWeapons: IWeapon[] = [
  {
    name: "Wicked Scimitar",
    description: "Curved and sharp.",
    value: 10,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D8], modifier: 0 },
    range: RangeType.Melee,
  },
  {
    name: "Bloody Maul",
    description: "A big chunk of metal on a stick. Can't go wrong.",
    value: 15,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D6], modifier: 1 },
    range: RangeType.Melee,
  },
  {
    name: "Jagged Spear",
    description: "Made from a railroad spike and a stick. Can't be too choosy.",
    value: 5,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D10], modifier: -1 },
    range: RangeType.Melee,
  },
  {
    name: "Knight's Longsword",
    description: "A fine blade, though little good it did the last owner.",
    value: 20,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D8], modifier: 2 },
    range: RangeType.Melee,
  },
];

export const rangedWeapons: IWeapon[] = [
  {
    name: "Hunter's Bow",
    description: "Adept at bringing down game.",
    value: 15,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D6], modifier: 1 },
    range: RangeType.Ranged,
  },
  {
    name: "Bandit's Crossbow",
    description: "A bit slow, but packs a punch.",
    value: 20,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D8], modifier: 1 },
    range: RangeType.Ranged,
  },
  {
    name: "Rusty Pistol",
    description: "Loud and unstable.",
    value: 10,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D10], modifier: 1 },
    range: RangeType.Ranged,
    tag: "unstable",
  },
  {
    name: "Heavy Rock",
    description: "Mankind's first ranged weapon.",
    value: 5,
    type: ItemType.Weapon,
    damage: { dice: [DiceType.D4], modifier: -1 },
    range: RangeType.Ranged,
  },
];

export const scrolls: IScroll[] = [
  {
    name: "Unholy Conflagration (scroll)",
    description: "Putrid flames leap from your hands to consume your enemies.",
    value: 10,
    type: ItemType.Scroll,
    spell: "flames",
    effect: {
      type: EffectType.Health,
      dice: { dice: [DiceType.D12], modifier: 0 },
      target: "enemies",
    },
  },
  {
    name: "Blinding Light (scroll)",
    description: "A flash of light to blind your enemies.",
    value: 10,
    type: ItemType.Scroll,
    spell: "blind",
    effect: {
      type: EffectType.Status,
      value: 3,
      status: StatusType.Stun,
      target: "enemies",
    },
  },
  {
    name: "Ease Pain (scroll)",
    description:
      "It won't fix your broken bones, but it'll help you keep moving.",
    value: 5,
    type: ItemType.Scroll,
    spell: "heal",
    effect: { type: EffectType.Health, value: 15, target: "self", sign: 1 },
  },
  {
    name: "Become Shadow (scroll)",
    description: "You melt into the darkness, unseen to all.",
    value: 5,
    type: ItemType.Scroll,
    spell: "invisible",
    effect: {
      type: EffectType.Status,
      value: 3,
      status: StatusType.Invisible,
      target: "self",
    },
  },
  {
    name: "Twist Minds (scroll)",
    description:
      "Bend the will of your foes to make them fight for you... for a time.",
    value: 10,
    type: ItemType.Scroll,
    spell: "turn",
    effect: {
      type: EffectType.Status,
      value: 3,
      status: StatusType.Turned,
      target: "",
    },
  },
];

export const getRandomStartingOptions = (): Item[] => {
  const melee = meleeWeapons[Math.floor(Math.random() * meleeWeapons.length)];
  const ranged =
    rangedWeapons[Math.floor(Math.random() * rangedWeapons.length)];
  const scroll = scrolls[Math.floor(Math.random() * scrolls.length)];
  return [melee, ranged, scroll];
};
