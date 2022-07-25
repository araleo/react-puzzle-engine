import { useState } from 'react';

export enum GameState {
  Begin = 'BEGIN',
  Running = 'RUNNING',
  Paused = 'PAUSED',
  End = 'END',
}

const useGameState = (defaultState?: GameState) => {
  const [gameState, setGameState] = useState<GameState>(
    defaultState || GameState.Begin
  );

  const begin = () => {
    setGameState(GameState.Begin);
  };

  const start = () => {
    setGameState(GameState.Running);
  };

  const pause = () => {
    setGameState(GameState.Paused);
  };

  const end = () => {
    setGameState(GameState.End);
  };

  return { gameState, begin, start, pause, end };
};

export default useGameState;
