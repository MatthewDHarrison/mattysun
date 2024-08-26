import { Favorite, FavoriteBorder, Toll } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ICharacter } from "../../game/character";

interface IOverlayProps {
  character: ICharacter;
}

export const Overlay = ({ character }: IOverlayProps) => {
  const name = character.name;
  const health = character.hp;
  const maxHealth = 30;
  const location = "Rotblack Dungeon";

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
              justifyContent="center"
              gap={1}
              flexDirection="row"
            >
              <FavoriteBorder />
              <Typography variant="game" fontSize={20}>
                {health}/{maxHealth}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              flexDirection="row"
            >
               <Toll />
              <Typography variant="game" fontSize={20}>
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
