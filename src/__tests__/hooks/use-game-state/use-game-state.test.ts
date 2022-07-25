import { act, renderHook } from '@testing-library/react';
import useGameState, {
  GameState,
} from '../../../hooks/use-game-state/use-game-state';

describe('useGameState tests', () => {
  test('useGameState renders in default mode (Begin)', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe(GameState.Begin);
  });

  test('useGameState renders with custom default mode', () => {
    const { result } = renderHook(() => useGameState(GameState.Running));
    expect(result.current.gameState).toBe(GameState.Running);
  });

  test('useGameState start method changes game state to Running', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe(GameState.Begin);
    act(() => result.current.start());
    expect(result.current.gameState).toBe(GameState.Running);
  });

  test('useGameState pause method changes game state to Paused', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe(GameState.Begin);
    act(() => result.current.pause());
    expect(result.current.gameState).toBe(GameState.Paused);
  });

  test('useGameState end method changes game state to End', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe(GameState.Begin);
    act(() => result.current.end());
    expect(result.current.gameState).toBe(GameState.End);
  });

  test('useGameState methods changes gameState', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe(GameState.Begin);
    act(() => result.current.start());
    expect(result.current.gameState).toBe(GameState.Running);
    act(() => result.current.pause());
    expect(result.current.gameState).toBe(GameState.Paused);
    act(() => result.current.start());
    expect(result.current.gameState).toBe(GameState.Running);
    act(() => result.current.end());
    expect(result.current.gameState).toBe(GameState.End);
    act(() => result.current.begin());
    expect(result.current.gameState).toBe(GameState.Begin);
  });
});
