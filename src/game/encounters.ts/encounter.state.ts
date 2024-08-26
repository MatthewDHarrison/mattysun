import { useState } from "react";
import {
  EncounterType,
  ICombatEncounter,
  IEncounter,
  RewardType,
} from "../encounter";
import { EffectType, IEffect, Item } from "../general";
import { ICharacter } from "../character";
import { rollDice } from "../dice";

export interface IEncounterState {
  encounter: IEncounter;
  isOver: boolean;
}

export const applyEffectToEncounter = (
  encounter: IEncounter,
  effect: IEffect,
  setEncounter: (encounterState: IEncounterState) => void,
  target?: "self" | "enemies" | "all" | number,
  character?: ICharacter,
) => {
  const totalValue =
    effect.value || 0 + (effect.dice ? rollDice(effect.dice) : 0);

  if (encounter.type === EncounterType.Combat) {
    const combatEncounter = encounter as ICombatEncounter;
    if (target === "self") {
      // apply effect to self
    }
    if (target === "enemies") {
      if (effect.type === EffectType.Health) {
        const newEnemies = combatEncounter.enemies.map((enemy) => {
          enemy.hp -= totalValue;
          if (enemy.hp <= 0) {
            return null;
          }
          return enemy;
        });
        combatEncounter.enemies = newEnemies.filter((enemy) => enemy !== null);
        setEncounter({
          encounter: combatEncounter,
          isOver: combatEncounter.enemies.length === 0,
        });
      }
    }
    if (target === "all") {
      // apply effect to all
    }
    if (typeof target === "number") {
      const enemy = combatEncounter.enemies[target];
      if (effect.type === EffectType.Health) {
        enemy.hp -= totalValue;
        if (enemy.hp <= 0) {
          combatEncounter.enemies.splice(target, 1);
        }
        setEncounter({
          encounter: combatEncounter,
          isOver: combatEncounter.enemies.length === 0,
        });
      }
    }
  }
};

export const useEncounterState = () => {
  const [encounterState, setEncounterState] = useState<IEncounterState | null>(
    null,
  );

  const startEncounter = (encounter: IEncounter) => {
    setEncounterState({
      encounter: encounter,
      isOver: false,
    });
  };

  const applyEffect = (
    effect: IEffect,
    target?: "self" | "enemies" | "all" | number,
    character?: ICharacter,
  ) => {
    if (encounterState) {
      applyEffectToEncounter(
        encounterState.encounter,
        effect,
        setEncounterState,
        target,
        character,
      );
    }
  };

  const endEncounter = (
    setCharacter: React.Dispatch<
      React.SetStateAction<ICharacter | null | undefined>
    >,
  ) => {
    setCharacter((prev) => {
      if (!prev) {
        return prev;
      }
      const newCoins = encounterState?.encounter.rewards.reduce(
        (acc, reward) => {
          if (reward.type === RewardType.Coin) {
            return acc + reward.value;
          }
          return acc;
        },
        0,
      );
      // const newItems: Item[] = encounterState?.encounter.rewards.reduce(
      //   (acc, reward) => {
      //     if (reward.type === RewardType.Item && reward.item) {
      //       return [...acc, reward.item as Item];
      //     }
      //     return acc;
      //   },
      //   [] as Item[],
      // );
      const newItems: Item[] = [];

      return {
        ...prev,
        coin: prev.coin + (newCoins || 0),
        items: [...prev.items, ...newItems],
      };
    });
    setEncounterState(null);
  };

  return { encounterState, startEncounter, endEncounter, applyEffect };
};
