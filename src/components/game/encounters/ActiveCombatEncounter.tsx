import { Box, Modal, Typography } from "@mui/material";
import { ICombatEncounter, IOption } from "../../../game/encounter";
import React, { act, useEffect } from "react";
import {
  ICharacter,
  IStats,
  useCharacter,
  useEquippedItems,
} from "../../../game/character/character";
import {
  EffectType,
  ItemType,
  IWeapon,
  RangeType,
} from "../../../game/general";
import { useEncounterState } from "../../../game/encounters/encounter.state";
import { useMount } from "react-use";
import { getDiceString, getSuccessChance } from "../../../game/dice";
import { ItemIcon } from "../../../game/content/ItemIcon";
import { EncounterEndModal } from "./EncounterEndModal";
import { abbreviateStat } from "../../../game/character/character.helpers";
import { gameTheme } from "../../../game/GameTheme";
import { EncounterEnemy } from "./EncounterEnemy";
import { Overlay } from "../Overlay";

interface IActiveCombatEncounterProps {
  combatEncounter: ICombatEncounter;
  character: ICharacter;
  setCharacter: React.Dispatch<
    React.SetStateAction<ICharacter | null | undefined>
  >;
}

export const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
  width: 1000,
  height: 300,
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export const ActiveCombatEncounter = ({
  combatEncounter,
  character,
  setCharacter,
}: IActiveCombatEncounterProps) => {
  if (!character) {
    return null;
  }
  const {
    encounterState,
    startEncounter,
    setEncounterState,
    endEncounter,
    doOption,
  } = useEncounterState();
  const combatEncounterState = encounterState?.encounter as ICombatEncounter;
  const { equippedItems, setEquippedItems } = useEquippedItems(character);
  const [theirTurn, setTheirTurn] = React.useState(false);
  const equippedMelee = equippedItems?.melee;
  const equippedRanged = equippedItems?.ranged;

  const [activeTarget, setActiveTarget] = React.useState<string>("");
  const [showActiveWeaponModal, setShowActiveWeaponModal] =
    React.useState(false);
  const [itemModalType, setItemModalType] = React.useState<RangeType>(
    RangeType.Melee,
  );
  const [enemyOption, setEnemyOption] = React.useState<IOption | null>(null);
  const [hpDiff, setHpDiff] = React.useState<number | null>(null);
  const [currHp, setCurrHp] = React.useState<number>(character.hp);
  const [options, setOptions] = React.useState<IOption[]>([]);

  useEffect(() => {
    if (theirTurn) {
      setHpDiff(null);
      if (combatEncounterState) {
        combatEncounterState.enemies.forEach((enemy) => {
          const option =
            enemy.options[Math.floor(Math.random() * enemy.options.length)];
          setEnemyOption(option);
          doOption(option, character, setCharacter);
          setTimeout(() => {
            setEnemyOption(null);
            setTheirTurn(false);
          }, 2000);
        });
      }
    }
  }, [theirTurn]);

  useEffect(() => {
    if (character.hp < currHp) {
      setHpDiff(currHp - character.hp);
      setCurrHp(character.hp);
      return;
    }
    setHpDiff(null);
  }, [character.hp]);

  useEffect(() => {
    setOptions([
      {
        description: "Strike",
        stat: "strength",
        difficulty:
          combatEncounter.enemies.find((enemy) => enemy.id === activeTarget)
            ?.defense || 0,
        onSuccess: [
          {
            type: EffectType.Health,
            dice: equippedMelee?.damage,
            target: activeTarget,
          },
        ],
        onFail: [],
      },
      {
        description: "Volley",
        stat: "agility",
        difficulty:
          combatEncounter.enemies.find((enemy) => enemy.id === activeTarget)
            ?.defense || 0,
        onSuccess: [
          {
            type: EffectType.Health,
            dice: equippedRanged?.damage,
            target: activeTarget,
          },
        ],
        onFail: [],
      },
      {
        description: "Cast Spell",
        stat: "presence",
        onSuccess: [],
        onFail: [],
      },
      {
        description: "Flee",
        stat: "agility",
        onSuccess: [],
        onFail: [],
      },
    ]);
    return;
  }, [equippedItems, activeTarget]);

  useEffect(() => {
    if (combatEncounterState) {
      setActiveTarget(
        combatEncounter.enemies[0] ? combatEncounter.enemies[0].id : "",
      );
    }
  }, [encounterState]);

  useMount(() => {
    startEncounter(combatEncounter);
  });

  if (!encounterState) {
    return null;
  }

  return (
    <>
      <Overlay
        character={character}
        encounterState={encounterState}
        setEncounterState={setEncounterState}
        setCharacter={setCharacter}
        equippedItems={equippedItems}
        setEquippedItems={setEquippedItems}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        justifyContent="space-between"
        height="100%"
        zIndex={1}
        width={1200}
      >
        <Box margin={4}>
          <Typography variant="game" fontSize={64}>
            {encounterState.encounter.name}
          </Typography>
        </Box>
        {combatEncounterState.enemies.map((enemy, index) => (
          <EncounterEnemy key={`enemy_${index}`} enemy={enemy} />
        ))}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={5}
          width={1000}
          zIndex={1}
          margin={8}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            marginTop={4}
            width="100%"
            gap={2}
          >
            {!theirTurn &&
              Array.from(
                { length: Math.ceil(options.length / 2) },
                (_, idx) => idx,
              ).map((_, index) => (
                <Box
                  key={`option_row_${index}`}
                  padding={1}
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-evenly"
                  gap={3}
                >
                  {options
                    .slice(index * 2, index * 2 + 2)
                    .map((option, idx) => {
                      const successChance =
                        option.stat && option.difficulty
                          ? getSuccessChance(
                              character.stats[option.stat],
                              option.difficulty,
                            )
                          : 1;
                      const numPips = Math.floor(successChance * 5);
                      return (
                        <Box
                          key={`option_${index}_${idx}`}
                          padding={1}
                          sx={{
                            border: `2px solid ${gameTheme.palette.light}`,
                            cursor: "pointer",
                          }}
                          backgroundColor={gameTheme.palette.dark}
                          display="flex"
                          flexDirection="column"
                          width={"100%"}
                          alignItems="center"
                          gap={1}
                          onClick={() => {
                            if (option.description === "Strike") {
                              if (!equippedMelee) {
                                setItemModalType(RangeType.Melee);
                                setShowActiveWeaponModal(true);
                              } else {
                                doOption(option, character);
                                setTimeout(() => {
                                  setTheirTurn(true);
                                }, 500);
                              }
                              return;
                            }
                            if (option.description === "Volley") {
                              if (!equippedRanged) {
                                setItemModalType(RangeType.Ranged);
                                setShowActiveWeaponModal(true);
                              } else {
                                doOption(option, character);
                                setTimeout(() => {
                                  setTheirTurn(true);
                                }, 500);
                              }
                              return;
                            }
                            doOption(option, character);
                            setTimeout(() => {
                              setTheirTurn(true);
                            }, 1000);
                          }}
                        >
                          <Typography
                            alignSelf="center"
                            variant="game"
                            fontSize={28}
                          >
                            {option.description}
                            {`${option.stat && ` (${abbreviateStat(option.stat)})`}`}
                          </Typography>
                          {option.stat && option.difficulty && (
                            <Box
                              display="flex"
                              flexDirection="row"
                              gap={1}
                              sx={{ mb: 1 }}
                            >
                              {Array.from({ length: 5 }, (_, idx) => (
                                <Box
                                  key={`pip_${idx}`}
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    backgroundColor:
                                      idx < numPips
                                        ? gameTheme.palette.light
                                        : gameTheme.palette.light2,
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                </Box>
              ))}
            {enemyOption && theirTurn && (
              <Box
                padding={1}
                sx={{
                  border: `2px solid ${gameTheme.palette.light}`,
                }}
                backgroundColor={gameTheme.palette.dark}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <Typography alignSelf="center" variant="game" fontSize={28}>
                  {enemyOption.description}
                </Typography>
                <Typography alignSelf="center" variant="game" fontSize={20}>
                  {hpDiff
                    ? `You took ${hpDiff} damage`
                    : "You withstood the blow"}
                </Typography>
              </Box>
            )}
          </Box>
          <Modal
            open={showActiveWeaponModal}
            onClose={() => setShowActiveWeaponModal(false)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={5}
              sx={modalStyle}
              padding={2}
            >
              <Typography alignSelf="center" variant="game" fontSize={30}>
                Choose a weapon to attack with
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
                gap={2}
              >
                {character.items
                  .filter(
                    (item) =>
                      item.type === ItemType.Weapon &&
                      (item as IWeapon).range === itemModalType,
                  )
                  .map((weapon, index) => (
                    <Box
                      key={index}
                      padding={2}
                      sx={{
                        border: `1px solid ${gameTheme.palette.light}`,
                        cursor: "pointer",
                      }}
                      width={"100%"}
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      onClick={() => {
                        if (!equippedItems) {
                          return;
                        }
                        setEquippedItems({
                          ...equippedItems,
                          [itemModalType === RangeType.Melee
                            ? "melee"
                            : "ranged"]: weapon as IWeapon,
                        });
                        setShowActiveWeaponModal(false);
                      }}
                    >
                      <ItemIcon item={weapon} sx={{ fontSize: 30 }} />
                      <Typography
                        alignSelf="center"
                        variant="game"
                        fontSize={24}
                      >
                        {weapon.name} -{" "}
                        {getDiceString((weapon as IWeapon).damage)}
                      </Typography>
                      <Typography
                        alignSelf="center"
                        variant="game"
                        fontSize={16}
                      >
                        {weapon.description}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Modal>
          <EncounterEndModal
            encounterState={encounterState}
            onClose={() => endEncounter(setCharacter)}
          />
        </Box>
      </Box>
    </>
  );
};
