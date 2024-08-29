import { Favorite, FavoriteBorder, Toll } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICharacter } from "../../game/character/character";

interface IOverlayProps {
  character: ICharacter;
}

export const Overlay = ({ character }: IOverlayProps) => {
  const name = character.name;
  const [currentHealth, setCurrentHealth] = useState(character.hp);
  const maxHealth = 30;
  const location = "Rotblack Dungeon";
  const [heartSize, setHeartSize] = useState("medium");
  const [heartColor, setHeartColor] = useState("white");

  useEffect(() => {
    setCurrentHealth(character.hp);
    if (character.hp < currentHealth) {
      // change heart size and color for 1 second
      setHeartColor("red");
      setHeartSize("large");
      setTimeout(() => {
        setHeartColor("white");
        setHeartSize("medium");
      }, 100);
    }
  }, [character]);

  return (
    <Box zIndex={1} position="absolute" height="100vh" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        padding={3}
        width="100%"
        position="absolute"
        top={0}
      >
        <Box display="flex-between" alignItems="center">
          <Box
            sx={{ borderRadius: "50%", width: 100, height: 100 }}
            bgcolor="gray"
            padding={1}
            margin={1}
            component="img"
            src="/assets/game/hero.png"
          ></Box>
          <Box margin={1} display="flex" flexDirection="column">
            <Box>
              <Typography variant="game" fontSize={30}>
                {name}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              flexDirection="row"
              height="6-px"
              width="120px"
            >
              <Box height="20px" sx={{ ml: 2 }}>
                <FavoriteBorder
                  fontSize={heartSize}
                  htmlColor={heartColor}
                  sx={{
                    transition: "color 0.1s, size 0.1s",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
              <Typography variant="game" fontSize={20} sx={{ mb: 2.3 }}>
                {currentHealth}/{maxHealth}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              flexDirection="row"
              height="6-px"
              width="120px"
            >
              <Box height="20px" sx={{ ml: 2 }}>
                <Toll
                  sx={{
                    transition: "color 0.1s, size 0.1s",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
              <Typography variant="game" fontSize={20} sx={{ mb: 2 }}>
                {character.coin}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box margin={3}>
          <Typography variant="game" fontSize={30}>
            {location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
