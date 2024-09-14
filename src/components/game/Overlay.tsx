import { FavoriteBorder, HeartBrokenOutlined, Toll } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ICharacter,
  IEquippedItems,
  useCharacter,
  useEquippedItems,
} from "../../game/character/character";
import { gameTheme } from "../../game/GameTheme";
import { ItemIcon } from "../../game/content/ItemIcon";
import {
  IArmor,
  IConsumable,
  IItem,
  ItemType,
  IWeapon,
} from "../../game/general";
import {
  applyEffectToEncounter,
  IEncounterState,
  useEncounterState,
} from "../../game/encounters/encounter.state";

const isEquipped = (equippedItems: IEquippedItems, item: IItem) => {
  if (equippedItems.melee?.name === item.name) {
    return true;
  }
  if (equippedItems.ranged?.name === item.name) {
    return true;
  }
  if (equippedItems.armor?.name === item.name) {
    return true;
  }
  return false;
};

interface IOverlayProps {
  character: ICharacter;
  encounterState: IEncounterState;
  setEncounterState: React.Dispatch<
    React.SetStateAction<IEncounterState | null>
  >;
  setCharacter: React.Dispatch<
    React.SetStateAction<ICharacter | null | undefined>
  >;
  equippedItems: IEquippedItems | undefined;
  setEquippedItems: React.Dispatch<
    React.SetStateAction<IEquippedItems | undefined>
  >;
}

const ANIMATION_DURATION = 100;
const SVG_SIZE_SMALL = 32;
const SVG_SIZE_LARGE = 48;

export const Overlay = ({
  character,
  encounterState,
  setEncounterState,
  setCharacter,
  equippedItems,
  setEquippedItems,
}: IOverlayProps) => {
  const name = character.name;
  const [currentHealth, setCurrentHealth] = useState(character.hp);
  const [currentCoin, setCurrentCoin] = useState(character.coin);
  const maxHealth = 30;
  const location = "Rotblack Dungeon";
  const [heartSize, setHeartSize] = useState(SVG_SIZE_SMALL);
  const [heartColor, setHeartColor] = useState("light");
  const [coinSize, setCoinSize] = useState(SVG_SIZE_SMALL);
  const [coinColor, setCoinColor] = useState("light");
  const [animTime, setAnimTime] = useState(ANIMATION_DURATION);
  const [hoveredItem, setHoveredItem] = useState<IItem | null>(null);

  useEffect(() => {
    const healthDifference = character.hp - currentHealth;
    setCurrentHealth(character.hp);
    setCurrentCoin(character.coin);
    if (character.hp !== currentHealth) {
      if (healthDifference > 7) {
        setAnimTime(ANIMATION_DURATION * 2);
      }
      // change heart size and color for 1 second
      setHeartColor(gameTheme.palette.red || "red");
      setHeartSize(SVG_SIZE_LARGE);
      setTimeout(() => {
        setHeartColor("light");
        setHeartSize(SVG_SIZE_SMALL);
      }, ANIMATION_DURATION);
    }

    if (character.coin !== currentCoin) {
      // change heart size and color for 1 second
      setCoinColor("yellow");
      setCoinSize(SVG_SIZE_LARGE);
      setTimeout(() => {
        setCoinColor("light");
        setCoinSize(SVG_SIZE_SMALL);
      }, ANIMATION_DURATION);
    }
  }, [character]);

  return (
    <Box zIndex={1} position="absolute" height="100vh" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        padding={2}
        width="100%"
        position="absolute"
        top={0}
      >
        <Box>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{ borderRadius: "50%", width: 120, height: 120 }}
              bgcolor={gameTheme.palette.light2}
              padding={1}
              margin={1}
              component="img"
              src="/assets/game/hero.png"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="200px"
            position="relative"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              position="relative"
              marginTop={1}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                height={10}
                width="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  transform: "translateY(-50%)",
                }}
                zIndex={1}
              >
                <Box
                  backgroundColor={gameTheme.palette.red || "red"}
                  width={(currentHealth / maxHealth) * 100 + "%"}
                  height={1}
                />
                <Box
                  backgroundColor={gameTheme.palette.light || "white"}
                  width={(1 - currentHealth / maxHealth) * 100 + "%"}
                  height={1}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              position="relative"
              marginTop={1}
            >
              <Box
                height={SVG_SIZE_SMALL}
                width={SVG_SIZE_LARGE}
                position="relative"
                zIndex={10}
              >
                {currentHealth > 5 ? (
                  <FavoriteBorder
                    htmlColor={heartColor}
                    sx={{
                      position: "absolute",
                      transition: `all ${animTime / 1000}s`,
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                      fontSize: heartSize,
                    }}
                  />
                ) : (
                  <HeartBrokenOutlined
                    htmlColor={heartColor}
                    sx={{
                      position: "absolute",
                      transition: `all ${animTime / 1000}s`,
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                      fontSize: heartSize,
                    }}
                  />
                )}
              </Box>
              <Typography variant="game" fontSize={24}>
                {name}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
            >
              <Box
                height={SVG_SIZE_SMALL}
                width={SVG_SIZE_LARGE}
                position="relative"
              >
                <Toll
                  htmlColor={coinColor}
                  sx={{
                    position: "absolute",
                    transition: `all ${ANIMATION_DURATION / 1000}s`,
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                    fontSize: coinSize,
                  }}
                />
              </Box>
              <Typography variant="game" fontSize={24}>
                {currentCoin}
              </Typography>
            </Box>
            <Box width="100%" marginTop={2}>
              <Typography variant="game" fontSize={24}>
                Equipment
              </Typography>
            </Box>
            <Box
              width="100%"
              backgroundColor={gameTheme.palette.light}
              height={2}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              padding={1}
              width="100%"
              sx={{ borderRadius: 2 }}
              gap={1}
            >
              {character.items.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  style={{
                    opacity:
                      hoveredItem === item
                        ? 1
                        : equippedItems && isEquipped(equippedItems, item)
                          ? 0.9
                          : 0.5,
                  }}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (item.type === ItemType.Consumable && encounterState) {
                      const consumableItem = item as IConsumable;
                      applyEffectToEncounter(
                        encounterState.encounter,
                        consumableItem.effect,
                        setEncounterState,
                        character,
                        setCharacter,
                      );
                      setCharacter((prev: ICharacter | null | undefined) =>
                        prev
                          ? {
                              ...prev,
                              items: prev.items.filter(
                                (i) => i.name !== item.name,
                              ),
                            }
                          : prev,
                      );
                    }
                    if (item.type === ItemType.Armor) {
                      setEquippedItems((prev: IEquippedItems | undefined) =>
                        prev
                          ? {
                              ...prev,
                              armor: item as IArmor,
                            }
                          : undefined,
                      );
                    }
                    if (item.type === ItemType.Weapon) {
                      const weapon = item as IWeapon;
                      setEquippedItems((prev: IEquippedItems | undefined) =>
                        prev
                          ? {
                              ...prev,
                              ...(weapon.range === "melee"
                                ? { melee: weapon }
                                : {}),
                              ...(weapon.range === "ranged"
                                ? { ranged: weapon }
                                : {}),
                            }
                          : undefined,
                      );
                    }
                  }}
                >
                  {<ItemIcon item={item} sx={{ fontSize: 30 }} />}
                  <Typography variant="game" fontSize={20}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box margin={3}>
          <Typography variant="game" fontSize={40}>
            {location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
