import React, { useEffect } from "react";
import { Box, Link } from "@mui/material";
import { Scene } from "../components/SunClouds";
import {
  Instagram,
  Email,
  Apple,
  GraphicEq,
  MusicNote,
} from "@mui/icons-material";

const paths = [
  "assets/action1_scaled.png",
  "assets/action2_scaled.png",
  "assets/action3_scaled.png",
];

const fart1 = new Audio("sounds/fart1.mp3#t=0.8");
const fart2 = new Audio("sounds/fart2.mp3");
const fart3 = new Audio("sounds/fart3.mp3#t=1.8");

export const HomePage = () => {
  const width = window.innerWidth;

  const [isPooing, setIsPooing] = React.useState(false);
  const [pathIndex, setPathIndex] = React.useState(0);

  const [fartSounds, setFartSounds] = React.useState([fart1, fart2, fart3]);

  useEffect(() => {
    if (isPooing) {
      fartSounds[pathIndex].play();
      setPathIndex((prev) => (prev + 1) % paths.length);
      const interval = setTimeout(() => {
        setIsPooing(false);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPooing]);

  return (
    <>
      <Box
        height={"100vh"}
        width="100vw"
        position="relative"
        display="flex"
        alignItems="end"
        justifyContent="center"
        padding={{ b: 3 }}
      >
        <Box zIndex={1} position="absolute" height="100vh" width="100%">
          <Box
            position="absolute"
            sx={{
              left: "50%",
              top: "28%",
              transform: `translate(-50%, -50%)`,
              cursor: "pointer",
            }}
            zIndex={2}
            onClick={() => setIsPooing(true)}
          >
            <img
              src={isPooing ? paths[pathIndex] : "assets/chill.png"}
              style={{ width: 280 * 1.2, height: 400 * 1.2 }}
            />
          </Box>
          <Scene isPooing={isPooing} />
        </Box>
      </Box>
    </>
  );
};
