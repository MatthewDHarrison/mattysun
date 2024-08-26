import React, { useEffect, useState } from "react";
import { ICharacter, useCharacter } from "../../../game/character";
import { Box, Button, Input, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  ArrowForward,
  ArrowForwardIos,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { Item } from "../../../game/general";
import { IGameState, useGameState } from "../../../game/state";
import {
  getRandomStartingOptions,
  startingGear,
} from "../../../game/content/items";
import { ItemIcon } from "../../../game/content/ItemIcon";
import { StartingItem } from "./StartingItem";

const ABILITIES = ["Strength", "Agility", "Presence", "Toughness"];

const NameInput = styled.input`
  border: 1px solid white;
  color: white;
  background-color: transparent;
  font-size: 20px;
  padding: 10px;
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
      boxShadow: 'none',
    },
    'MuiInputBase-root-MuiInput-root::after': {
      borderColor: 'transparent',
      border-bottom: '',
    },
  },
`;

interface ICharacterCreationProps {
  updateGameState: (newGameState: IGameState) => void;
  setCharacter: (character: ICharacter) => void;
}

export const CharacterCreation = ({
  updateGameState,
  setCharacter,
}: ICharacterCreationProps) => {
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<"name" | "abilities" | "items" | "end">(
    "name",
  );
  const { character, createCharacter } = useCharacter();
  const [abilities, setAbilities] = useState<number[] | null>(null);
  const [chosenItem, setChosenItem] = useState<Item | null>(null);
  const [abilitiesValid, setAbilitiesValid] = useState<boolean>(false);
  const [itemOptions, setItemOptions] = useState<Item[]>([]);
  const [message, setMessage] = useState<string>("Perfectly unremarkable.");

  const handleCreateCharacter = () => {
    createCharacter(name);
  };

  const setCharacterAbilities = (abilities: number[]) => {
    if (character) {
      setCharacter({
        ...character,
        strength: abilities[0],
        agility: abilities[1],
        presence: abilities[2],
        toughness: abilities[3],
      });
    }
  };

  const setCharacterItems = (items: Item[]) => {
    if (character) {
      setCharacter({
        ...character,
        items: items,
      });
    }
  };

  useEffect(() => {
    if (character) {
      setAbilities([
        character.strength,
        character.agility,
        character.presence,
        character.toughness,
      ]);
    }
  }, [character]);

  useEffect(() => {
    if (abilities) {
      const total = abilities.reduce((acc, curr) => acc + curr, 0);
      setAbilitiesValid(total < 3);

      const highestAbilityIndex = abilities.indexOf(Math.max(...abilities));
      const abilitiesEqual = abilities.every((val, i, arr) => val === arr[0]);

      if (abilitiesEqual) {
        setMessage("Perfectly unremarkable.");
        return;
      }
      switch (highestAbilityIndex) {
        case 0:
          setMessage("You have more muscle than common sense.");
          break;
        case 1:
          setMessage("Fleet of foot. You know cowards tend to live longer.");
          break;
        case 2:
          setMessage("A scholar, a poet, a fool. You'll need more than words.");
          break;
        case 3:
          setMessage("You can take a few punches. Gods know you'll need it.");
          break;
        default:
          setMessage("");
      }
    }
    setItemOptions(getRandomStartingOptions());
  }, [abilities]);

  const handleClick = () => {
    if (step === "name") {
      handleCreateCharacter();
      setStep("abilities");
      return;
    }
    if (step === "abilities") {
      setCharacterAbilities(abilities || [0, 0, 0, 0]);
      setStep("items");
      return;
    }
    if (step === "items") {
      if (!chosenItem) {
        return;
      }
      setCharacterItems([...startingGear, chosenItem]);
      updateGameState({ location: "intro" });
      setStep("end");
      return;
    }
  };

  if (step === "end") {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ border: "4px solid white", borderRadius: 2 }}
      padding={4}
      minWidth={800}
    >
      {step === "name" && (
        <>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="game" fontSize={40}>
              Who are you, wretched one?
            </Typography>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            marginTop={4}
            width="100%"
            gap={2}
          >
            <NameInput
              value={name}
              style={{ fontFamily: "fantasy" }}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </>
      )}
      {step === "abilities" && (
        <>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="game" fontSize={40}>
              ABILITIES
            </Typography>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="space-evenly"
            alignItems="center"
            marginTop={4}
            width="100%"
            gap={10}
            sx={{ px: 10 }}
          >
            {abilities?.map((ability, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <KeyboardDoubleArrowUp
                  fontSize={"large"}
                  sx={{ cursor: "pointer" }}
                  style={{
                    opacity: abilitiesValid && abilities[index] < 2 ? 1 : 0.5,
                  }}
                  onClick={
                    abilitiesValid && abilities[index] < 2
                      ? () => {
                          if (abilities) {
                            const newAbilities = [...abilities];
                            newAbilities[index] += 1;
                            setAbilities(newAbilities);
                          }
                        }
                      : undefined
                  }
                />
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="game" fontSize={60}>
                    {ability}
                  </Typography>
                  <Typography variant="game" fontSize={16}>
                    {ABILITIES[index]}
                  </Typography>
                </Box>
                <KeyboardDoubleArrowDown
                  fontSize={"large"}
                  sx={{ cursor: "pointer", marginTop: 2 }}
                  style={{ opacity: abilities[index] > -2 ? 1 : 0.5 }}
                  onClick={
                    abilities[index] >= -2
                      ? () => {
                          if (abilities) {
                            const newAbilities = [...abilities];
                            newAbilities[index] -= 1;
                            setAbilities(newAbilities);
                          }
                        }
                      : undefined
                  }
                />
              </Box>
            ))}
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            width="100%"
            gap={10}
          >
            <Typography variant="game" fontSize={30}>
              {message}
            </Typography>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            marginTop={4}
            width="100%"
            gap={10}
          >
            <Typography variant="game" fontSize={20}>
              Remaining:{" "}
              {3 - (abilities?.reduce((acc, curr) => acc + curr, 0) || 0)}
            </Typography>
          </Box>
        </>
      )}
      {step === "items" && (
        <Box
          width="1000px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="game" fontSize={40}>
              Choose one to start your journey.
            </Typography>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            marginTop={4}
            width="100%"
            gap={2}
          >
            {itemOptions.map((item, index) => (
              <StartingItem
                key={index}
                item={item}
                onClick={(item) => setChosenItem(item)}
                selected={chosenItem?.name === item.name}
              />
            ))}
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            marginTop={10}
            width="100%"
            gap={10}
          >
            <Box>
              <Typography variant="game" fontSize={30}>
                You also start with:
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              gap={1}
            >
              {startingGear.map((item, index) => (
                <Box key={index} display="flex" flexDirection="row" gap={2}>
                  {<ItemIcon item={item} sx={{ fontSize: 30 }} />}
                  <Typography variant="game" fontSize={20}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        alignSelf="end"
        justifyContent="end"
        gap={1}
        marginTop={4}
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Typography variant="game" fontSize={26} marginBottom={0.5}>
          Confirm
        </Typography>
        <ArrowForwardIos fontSize={"medium"} />
      </Box>
    </Box>
  );
};
