import { useState } from "react";
import {
  EncounterType,
  ICombatEncounter,
  IEncounter,
  IOption,
  RewardType,
} from "../encounter";
import { EffectType, IEffect, Item } from "../general";
import { ICharacter } from "../character/character";
import { DiceType, rollDice } from "../dice";

export interface IEncounterState {
  encounter: IEncounter;
  isOver: boolean;
}

export const applyEffectToEncounter = (
  encounter: IEncounter,
  effect: IEffect,
  setEncounter: (encounterState: IEncounterState) => void,
  character?: ICharacter,
  setCharacter?: React.Dispatch<
    React.SetStateAction<ICharacter | null | undefined>
  >,
) => {
  console.log("Applying effect", effect);
  const totalValue =
    effect.value ||
    0 + (effect.dice ? rollDice(effect.dice) : 0) * (effect.sign || -1);

  if (encounter.type === EncounterType.Combat) {
    const combatEncounter = encounter as ICombatEncounter;
    if (effect.target === "self") {
      if (setCharacter === undefined || !character) {
        console.error("Need to pass setCharacter/character for self effects");
      }
      console.log("Applying effect to self", effect, totalValue);
      if (effect.type === EffectType.Health) {
        const newHp = character!.hp + totalValue;
        character!.hp = newHp;
        if (setCharacter) {
          setCharacter({
            ...character!,
            hp: character!.hp,
          });
        }
        if (newHp <= 0) {
          setEncounter({
            encounter: combatEncounter,
            isOver: true,
          });
        }
      }
      return;
    }
    if (effect.target === "enemies") {
      if (effect.type === EffectType.Health) {
        const newEnemies = combatEncounter.enemies.map((enemy) => {
          enemy.hp += totalValue;
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
      return;
    }
    if (effect.target === "all") {
      // apply effect to all
    }
    const enemy = combatEncounter.enemies.find(
      (enemy) => enemy.id === effect.target,
    );
    if (!enemy) {
      console.error("Enemy not found", effect.target);
      console.error(combatEncounter.enemies);
      console.error(effect);
      return;
    }
    if (effect.type === EffectType.Health) {
      enemy.hp += totalValue;
      if (enemy.hp <= 0) {
        combatEncounter.enemies = combatEncounter.enemies.filter(
          (e) => e.id !== enemy.id,
        );
      }
      setEncounter({
        encounter: combatEncounter,
        isOver: combatEncounter.enemies.length === 0,
      });
      return;
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

  const doOption = (
    option: IOption,
    character?: ICharacter,
    setCharacter?: React.Dispatch<
      React.SetStateAction<ICharacter | null | undefined>
    >,
  ) => {
    if (encounterState) {
      if (option.stat && option.difficulty) {
        // roll dice
        const roll = rollDice({
          dice: [DiceType.D6, DiceType.D6],
          modifier: character?.stats[option.stat] || 0,
        });
        if (roll < option.difficulty) {
          option.onFail.forEach((effect) => {
            applyEffectToEncounter(
              encounterState.encounter,
              effect,
              setEncounterState,
              character,
              setCharacter,
            );
          });
          return;
        }
        option.onSuccess.forEach((effect) => {
          applyEffectToEncounter(
            encounterState.encounter,
            effect,
            setEncounterState,
            character,
            setCharacter,
          );
        });
      }
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

  return {
    encounterState,
    startEncounter,
    endEncounter,
    doOption,
    setEncounterState,
  };
};
