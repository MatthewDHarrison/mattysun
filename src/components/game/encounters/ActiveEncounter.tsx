import { Box, Modal, Typography } from "@mui/material";
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

interface IEncounterProps {
  encounter: Encounter;
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
  setCharacter,
}: IEncounterProps) => {
  const { character } = useCharacter();
  if (!character) {
    return null;
  }
  const { encounterState, startEncounter, endEncounter, doOption } =
    useEncounterState();
  const { equippedItems, setEquippedItems } = useEquippedItems(character);
  const equippedMelee = equippedItems?.melee;
  const equippedRanged = equippedItems?.ranged;

  const [activeTarget, setActiveTarget] = React.useState<string>("");
  const [showActiveWeaponModal, setShowActiveWeaponModal] =
    React.useState(false);
  const [itemModalType, setItemModalType] = React.useState<RangeType>(
    RangeType.Melee,
  );

  const [options, setOptions] = React.useState<IOption[]>([]);

  useEffect(() => {
    if (encounter.type === EncounterType.Combat) {
      const combatEncounter = encounter as ICombatEncounter;
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
              dice: equippedMelee?.damage,
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
    }
    if (encounter.type === EncounterType.Mystery) {
      setOptions((encounter as IMysteryEncounter).options);
    }
  }, [equippedItems, activeTarget]);

  useEffect(() => {
    if (encounterState?.encounter.type === EncounterType.Combat) {
      setActiveTarget(
        (encounterState?.encounter as ICombatEncounter).enemies[0]
          ? (encounterState?.encounter as ICombatEncounter).enemies[0].id
          : "",
      );
    }
  }, [encounterState]);

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
      width={1000}
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
                width={400}
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
        flexDirection="column"
        justifyContent="space-evenly"
        marginTop={4}
        width="100%"
      >
        {Array.from(
          { length: Math.ceil(options.length / 2) },
          (_, idx) => idx,
        ).map((_, index) => (
          <Box
            key={`option_row_${index}`}
            padding={2}
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-evenly"
            gap={2}
          >
            {options.slice(index * 2, index * 2 + 2).map((option, idx) => (
              <Box
                key={`option_${index}_${idx}`}
                padding={2}
                sx={{ border: "1px solid white", cursor: "pointer" }}
                display="flex"
                flexDirection="column"
                width={"100%"}
                alignItems="center"
                onClick={() => {
                  if (option.description === "Strike") {
                    if (!equippedMelee) {
                      setItemModalType(RangeType.Melee);
                      setShowActiveWeaponModal(true);
                    } else {
                      doOption(option, character);
                    }
                  }
                  if (option.description === "Volley") {
                    if (!equippedMelee) {
                      setItemModalType(RangeType.Ranged);
                      setShowActiveWeaponModal(true);
                    } else {
                      doOption(option, character);
                    }
                  }
                }}
              >
                <Typography alignSelf="center" variant="game" fontSize={30}>
                  {option.description}
                  {`${option.stat && ` (${abbreviateStat(option.stat)})`}`}
                </Typography>
                {option.stat && option.difficulty && (
                  <Typography alignSelf="center" variant="game" fontSize={20}>
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
                  sx={{ border: "1px solid white", cursor: "pointer" }}
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
                      [itemModalType === RangeType.Melee ? "melee" : "ranged"]:
                        weapon as IWeapon,
                    });
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
