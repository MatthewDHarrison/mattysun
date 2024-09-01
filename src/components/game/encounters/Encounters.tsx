import { Encounter } from "../../../game/encounter";
import React, { useEffect } from "react";
import { ActiveEncounter } from "./ActiveEncounter";
import { ICharacter, useCharacter } from "../../../game/character/character";
import { Box } from "@mui/material";
import { Overlay } from "../Overlay";

interface IEncountersProps {
  encounters: Encounter[];
}

export const Encounters = ({ encounters }: IEncountersProps) => {
  const activeEncounter = encounters[0];
  const { character, setCharacter } = useCharacter();

  return (
    <Box
      height={"100vh"}
      width="100vw"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={{ b: 3 }}
      zIndex={1}
    >
      {character && <Overlay character={character} />}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        zIndex={1}
        width={1200}
      >
        <ActiveEncounter
          encounter={activeEncounter}
          setCharacter={setCharacter}
        />
      </Box>
    </Box>
  );
};
