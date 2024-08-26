import React, { useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import { Overlay } from "../../components/game/Overlay";
import { Encounters } from "../../components/game/Encounters";
import { encounters } from "../../game/content/encounters";
import { useCharacter } from "../../game/character";
import { useGameState } from "../../game/state";
import { CharacterCreation } from "../../components/game/Character/CharacterCreation";
import { useMount } from "react-use";
import { Ash } from "../../game/visual/Ash";
import { ArrowForwardIos } from "@mui/icons-material";

export const GamePage = () => {
  const width = window.innerWidth;
  const { character, setCharacter } = useCharacter();
  const { gameState, updateGameState } = useGameState();

  useEffect(() => {
    console.log("gameState", gameState);
    if (!gameState) {
      updateGameState({ location: "start" });
    }
  }, [gameState]);

  return (
    <>
      <Box
        height={"100vh"}
        width="100vw"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={{ b: 3 }}
        backgroundColor="black"
        className="Game"
        zIndex={0}
        key={gameState?.location}
      >
        {character && gameState?.location === "dungeon" && (
          <Overlay character={character} />
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          zIndex={1}
          width={width > 700 ? 1200 : "100%"}
        >
          {gameState?.location === "dungeon" && character && (
            <Encounters
              encounters={encounters}
              character={character}
              setCharacter={setCharacter}
            />
          )}
          {gameState?.location === "start" && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ border: "4px solid white", borderRadius: 2 }}
              padding={4}
              width={1200}
            >
              <Typography variant="game" fontSize={60}>
                NEPENTHE
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                alignSelf="center"
                justifyContent="end"
                gap={1}
                marginTop={4}
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  updateGameState({ location: "characterCreation" })
                }
              >
                <Typography variant="game" fontSize={26} marginBottom={0.5}>
                  Begin
                </Typography>
                <ArrowForwardIos fontSize={"medium"} />
              </Box>
            </Box>
          )}
          {gameState?.location === "characterCreation" && (
            <CharacterCreation
              updateGameState={updateGameState}
              setCharacter={setCharacter}
            />
          )}
          {gameState?.location === "intro" && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ border: "4px solid white", borderRadius: 2 }}
              padding={4}
              width={1200}
            >
              <Typography variant="game" fontSize={40}>
                You walked the rest of the way into town in the driving rain.
              </Typography>
              <Typography variant="game" fontSize={40}>
                {"(Your mule didn't survive the trip.)"}
              </Typography>
              <Typography variant="game" fontSize={40}>
                A greasy inn offers warmth and refuge from the torrent.
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                alignSelf="center"
                justifyContent="end"
                gap={1}
                marginTop={4}
                sx={{ cursor: "pointer" }}
                onClick={() => updateGameState({ location: "dungeon" })}
              >
                <Typography variant="game" fontSize={26} marginBottom={0.5}>
                  Begin
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
