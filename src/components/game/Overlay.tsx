import {
  Favorite,
  FavoriteBorder,
  HeartBrokenOutlined,
  Toll,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICharacter } from "../../game/character/character";

interface IOverlayProps {
  character: ICharacter;
}

const ANIMATION_DURATION = 100;
const SVG_SIZE_SMALL = 32;
const SVG_SIZE_LARGE = 48;

export const Overlay = ({ character }: IOverlayProps) => {
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

  useEffect(() => {
    const healthDifference = character.hp - currentHealth;
    setCurrentHealth(character.hp);
    setCurrentCoin(character.coin);
    if (character.hp !== currentHealth) {
      if (healthDifference > 7) {
        setAnimTime(ANIMATION_DURATION * 2);
      }
      // change heart size and color for 1 second
      setHeartColor("red");
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
        padding={3}
        width="100%"
        position="absolute"
        top={0}
      >
        <Box>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{ borderRadius: "50%", width: 120, height: 120 }}
              bgcolor="gray"
              padding={1}
              margin={1}
              component="img"
              src="/assets/game/hero.png"
            />
            <Box display="flex" flexDirection="column" sx={{ mt: 3, ml: 3 }}>
              <Typography variant="game" fontSize={40}>
                {name}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="50%">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
            >
              <Box
                height={SVG_SIZE_LARGE}
                width={SVG_SIZE_LARGE}
                position="relative"
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
              <Typography variant="game" fontSize={28}>
                {currentHealth}/{maxHealth}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
            >
              <Box
                height={SVG_SIZE_LARGE}
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
              <Typography variant="game" fontSize={28}>
                {currentCoin}
              </Typography>
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
