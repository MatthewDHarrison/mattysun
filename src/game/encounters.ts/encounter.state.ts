import { useState } from "react";
import { EncounterType, ICombatEncounter, IEncounter } from "../encounter";
import { EffectType, IEffect } from "../general";
import { ICharacter } from "../character";
import { rollDice } from "../dice";

export const applyEffectToEncounter = (
  encounter: IEncounter,
  effect: IEffect,
  setEncounter: (encounter: IEncounter) => void,
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
          ...combatEncounter,
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
          ...combatEncounter,
        });
      }
    }
  }
};

export const useActiveEncounter = () => {
  const [activeEncounter, setActiveEncounter] = useState<IEncounter | null>(
    null,
  );

  const startEncounter = (encounter: IEncounter) => {
    setActiveEncounter({
      ...encounter,
    });
    setActiveEncounter(encounter);
  };

  const applyEffect = (
    effect: IEffect,
    target?: "self" | "enemies" | "all" | number,
    character?: ICharacter,
  ) => {
    if (activeEncounter) {
      applyEffectToEncounter(
        activeEncounter,
        effect,
        setActiveEncounter,
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
      const newCoins = activeEncounter?.rewards.reduce((acc, reward) => {
        if (typeof reward === "number") {
          return acc + (reward as number);
        }
        return acc;
      }, 0);

      return {
        ...prev,
        coin: prev.coin + (newCoins || 0),
      };
    });
    setActiveEncounter(null);
  };

  return { activeEncounter, startEncounter, endEncounter, applyEffect };
};
