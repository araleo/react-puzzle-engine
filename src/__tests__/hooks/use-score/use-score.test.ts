import { act, renderHook } from '@testing-library/react';
import useScore from '../../../hooks/use-score/use-score';

describe('useScore hook tests', () => {
  test('useScore loads with the default config', () => {
    const { result } = renderHook(() => useScore());
    expect(result.current.score).toBe(0);
  });

  test('useScore loads with the custom config', () => {
    const { result } = renderHook(() => useScore({ start: 5 }));
    expect(result.current.score).toBe(5);
  });

  test('useScore addScore adds and subtracts scores', () => {
    const { result } = renderHook(() => useScore());
    expect(result.current.score).toBe(0);
    act(() => result.current.addScore(10));
    expect(result.current.score).toBe(10);
    act(() => result.current.addScore(-10));
    expect(result.current.score).toBe(0);
  });

  test('useScore multiplyScore multiplies and divides scores', () => {
    const { result } = renderHook(() => useScore({ start: 5 }));
    expect(result.current.score).toBe(5);
    act(() => result.current.multiplyScore(4));
    expect(result.current.score).toBe(20);
    act(() => result.current.multiplyScore(1 / 5));
    expect(result.current.score).toBe(4);
  });

  test('useScore setScore sets score values', () => {
    const { result } = renderHook(() => useScore());
    expect(result.current.score).toBe(0);
    act(() => result.current.setScore(10));
    expect(result.current.score).toBe(10);
    act(() => result.current.setScore(1));
    expect(result.current.score).toBe(1);
  });

  test('useScore reset resets scores to original default value', () => {
    const { result } = renderHook(() => useScore());
    expect(result.current.score).toBe(0);
    act(() => result.current.addScore(10));
    expect(result.current.score).toBe(10);
    act(() => result.current.resetScore());
    expect(result.current.score).toBe(0);
  });

  test('useScore reset resets scores to original custom value', () => {
    const { result } = renderHook(() => useScore({ start: 5 }));
    expect(result.current.score).toBe(5);
    act(() => result.current.addScore(10));
    expect(result.current.score).toBe(15);
    act(() => result.current.resetScore());
    expect(result.current.score).toBe(5);
  });

  test('useScore min and max configs works', () => {
    const { result } = renderHook(() =>
      useScore({ min: 10, max: 20, start: 10 })
    );
    expect(result.current.score).toBe(10);
    act(() => result.current.addScore(-10));
    expect(result.current.score).toBe(10);
    act(() => result.current.addScore(10));
    expect(result.current.score).toBe(20);
    act(() => result.current.addScore(1));
    expect(result.current.score).toBe(20);
  });

  test('useScore properly handles start value outside of min/max range', () => {
    const { result } = renderHook(() =>
      useScore({ min: 10, max: 20, start: 5 })
    );
    expect(result.current.score).toBe(0);
  });
});
