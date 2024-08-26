import { Encounter } from "../../../game/encounter";
import React from "react";
import { ActiveEncounter } from "./ActiveEncounter";
import { ICharacter } from "../../../game/character";

interface IEncountersProps {
  encounters: Encounter[];
  character: ICharacter;
  setCharacter: React.Dispatch<
    React.SetStateAction<ICharacter | null | undefined>
  >;
}

export const Encounters = ({
  encounters,
  character,
  setCharacter,
}: IEncountersProps) => {
  const activeEncounter = encounters[0];

  return (
    <ActiveEncounter
      encounter={activeEncounter}
      character={character}
      setCharacter={setCharacter}
    />
  );
};
