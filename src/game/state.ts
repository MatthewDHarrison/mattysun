import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export interface IGameState {
  location: string;
}

export const useGameState = () => {
  const [gameStateStorage, setGameStateStorage] =
    useLocalStorage<IGameState | null>("gameState", null);

  const [gameState, setGameState] = useState<IGameState | null>(
    gameStateStorage || null,
  );

  const updateGameState = (newGameState: IGameState) => {
    setGameState((prevState) => ({
      ...prevState,
      ...newGameState,
    }));
  };

  useEffect(() => {
    setGameStateStorage(gameState);
    console.log("state change");
  }, [gameState]);

  return {
    gameState,
    updateGameState,
  };
};
