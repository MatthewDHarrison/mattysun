import { Box, Button, Modal, styled, Typography } from "@mui/material";
import {
  Encounter,
  EncounterType,
  ICombatEncounter,
  IMysteryEncounter,
  IOption,
} from "../../../game/encounter";
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
import { Overlay } from "../Overlay";
import { abbreviateStat } from "../../../game/character/character.helpers";
import { gameTheme } from "../../../game/GameTheme";
import { EnemyCanvas } from "./EnemyCanvas";
import { keyframes } from "@emotion/react";
import { EncounterEnemy } from "./EncounterEnemy";
import { ActiveCombatEncounter } from "./ActiveCombatEncounter";

interface IEncounterProps {
  encounter: Encounter;
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

export const ActiveEncounter = ({
  encounter,
  character,
  setCharacter,
}: IEncounterProps) => {
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
  const [theirTurn, setTheirTurn] = React.useState(false);
  const { equippedItems, setEquippedItems } = useEquippedItems(character);

  const [hpDiff, setHpDiff] = React.useState<number | null>(null);
  const [currHp, setCurrHp] = React.useState<number>(character.hp);
  const [options, setOptions] = React.useState<IOption[]>([]);

  useEffect(() => {
    if (theirTurn) {
      console.log("their turn");
    }
  }, [theirTurn]);

  useEffect(() => {
    if (character.hp < currHp) {
      setHpDiff(currHp - character.hp);
    }
    setCurrHp(character.hp);
  }, [character.hp]);

  useEffect(() => {
    if (encounter.type === EncounterType.Mystery) {
      setOptions((encounter as IMysteryEncounter).options);
    }
  }, []);

  useMount(() => {
    startEncounter(encounter);
  });

  if (!encounterState) {
    return null;
  }
  if (encounter.type === EncounterType.Combat) {
    return (
      <ActiveCombatEncounter
        combatEncounter={encounter as ICombatEncounter}
        character={character}
        setCharacter={setCharacter}
      />
    );
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
                    .map((option, idx) => (
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
                          <Typography
                            alignSelf="center"
                            variant="game"
                            fontSize={20}
                          >
                            {(
                              getSuccessChance(
                                character.stats[option.stat],
                                option.difficulty,
                              ) * 100
                            ).toFixed(0)}
                            %
                          </Typography>
                        )}
                      </Box>
                    ))}
                </Box>
              ))}
          </Box>
          <EncounterEndModal
            encounterState={encounterState}
            onClose={() => endEncounter(setCharacter)}
          />
        </Box>
      </Box>
    </>
  );
};
