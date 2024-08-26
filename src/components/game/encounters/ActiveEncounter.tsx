import { Box, Modal, Typography } from "@mui/material";
import {
  Encounter,
  EncounterType,
  ICombatEncounter,
  IMysteryEncounter,
} from "../../../game/encounter";
import React from "react";
import { ICharacter } from "../../../game/character";
import { EffectType, ItemType, IWeapon } from "../../../game/general";
import { useEncounterState } from "../../../game/encounters.ts/encounter.state";
import { useMount } from "react-use";
import { getDiceString } from "../../../game/dice";
import { ItemIcon } from "../../../game/content/ItemIcon";
import { EncounterEndModal } from "./EncounterEndModal";

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
  const { encounterState, startEncounter, endEncounter, applyEffect } =
    useEncounterState();
  const [activeWeapon, setActiveWeapon] = React.useState<IWeapon | null>(null);
  const [showActiveWeaponModal, setShowActiveWeaponModal] =
    React.useState(false);

  const options =
    encounter.type === EncounterType.Mystery
      ? (encounter as IMysteryEncounter).options
      : [
          {
            description: "Attack",
            effects: [
              {
                type: EffectType.Health,
                dice: activeWeapon?.damage,
              },
            ],
          },
          {
            description: "Cast Spell",
            effects: [],
          },
          {
            description: "Flee",
            effects: [],
          },
        ];

  useMount(() => {
    startEncounter(encounter);
  });

  if (!encounterState) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ border: "4px solid white", borderRadius: 2 }}
      padding={5}
      width={700}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="game" fontSize={40}>
          {encounterState.encounter.name}
        </Typography>
        <Typography variant="game" fontSize={20}>
          {encounterState.encounter.description}
        </Typography>
      </Box>
      {encounterState.encounter.type === EncounterType.Combat && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          marginTop={3}
        >
          {(encounterState.encounter as ICombatEncounter).enemies.map(
            (enemy, index) => (
              <Box
                key={index}
                padding={2}
                sx={{ border: "1px solid white" }}
                width={200}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography alignSelf="center" variant="game" fontSize={24}>
                  {enemy.name}
                </Typography>
                <Typography alignSelf="center" variant="game" fontSize={16}>
                  {enemy.hp}/{enemy.maxHp}
                </Typography>
              </Box>
            ),
          )}
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-evenly"
        marginTop={4}
        width="100%"
      >
        {options.map((option, index) => (
          <Box
            key={index}
            padding={2}
            sx={{ border: "1px solid white", cursor: "pointer" }}
            width={200}
            display="flex"
            flexDirection="column"
            alignItems="center"
            onClick={() => {
              if (option.description === "Attack") {
                if (!activeWeapon) {
                  setShowActiveWeaponModal(true);
                } else {
                  option.effects.forEach((effect) => {
                    applyEffect(effect, "enemies", character);
                  });
                }
              }
            }}
          >
            <Typography alignSelf="center" variant="game" fontSize={20}>
              {option.description}
            </Typography>
          </Box>
        ))}
      </Box>
      <Modal
        open={showActiveWeaponModal}
        onClose={() => setShowActiveWeaponModal(false)}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          gap={2}
          sx={modalStyle}
          padding={5}
        >
          <Typography alignSelf="center" variant="game" fontSize={30}>
            Choose a weapon to attack with
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            {character.items
              .filter((item) => item.type === ItemType.Weapon)
              .map((weapon, index) => (
                <Box
                  key={index}
                  padding={2}
                  sx={{ border: "1px solid white", cursor: "pointer" }}
                  width={300}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  onClick={() => {
                    setActiveWeapon(weapon as IWeapon);
                    setShowActiveWeaponModal(false);
                  }}
                >
                  <ItemIcon item={weapon} sx={{ fontSize: 30 }} />
                  <Typography alignSelf="center" variant="game" fontSize={24}>
                    {weapon.name} - {getDiceString((weapon as IWeapon).damage)}
                  </Typography>
                  <Typography alignSelf="center" variant="game" fontSize={16}>
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
  );
};
