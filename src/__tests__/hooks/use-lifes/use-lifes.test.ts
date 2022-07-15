import { act, renderHook } from '@testing-library/react';
import useLifes from '../../../hooks/use-lifes/use-lifes';

describe('useLifes hook tests', () => {
  test('useLifes loads with the default configs', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
  });

  test('useLifes loads with the custom configs', () => {
    const { result } = renderHook(() => useLifes({ start: 10 }));
    expect(result.current.lifes).toBe(10);
  });

  test('useLifes addOne adds one life', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.addOneLife());
    expect(result.current.lifes).toBe(4);
  });

  test('useLifes takeOne takes one life', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.takeOneLife());
    expect(result.current.lifes).toBe(2);
  });

  test('useLifes addLife adds and subtracts lifes', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.addLifes(10));
    expect(result.current.lifes).toBe(13);
    act(() => result.current.addLifes(-10));
    expect(result.current.lifes).toBe(3);
  });

  test('useLifes multiplyLifes multiplies and divides lifes', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.multiplyLifes(2));
    expect(result.current.lifes).toBe(6);
    act(() => result.current.multiplyLifes(1 / 3));
    expect(result.current.lifes).toBe(2);
  });

  test('useLifes setLifes sets lifes values', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.setLifes(10));
    expect(result.current.lifes).toBe(10);
    act(() => result.current.setLifes(1));
    expect(result.current.lifes).toBe(1);
  });

  test('useLifes reset resets lifes to original default value', () => {
    const { result } = renderHook(() => useLifes());
    expect(result.current.lifes).toBe(3);
    act(() => result.current.addLifes(7));
    expect(result.current.lifes).toBe(10);
    act(() => result.current.resetLifes());
    expect(result.current.lifes).toBe(3);
  });

  test('useLifes reset resets lifes to original custom value', () => {
    const { result } = renderHook(() => useLifes({ start: 5 }));
    expect(result.current.lifes).toBe(5);
    act(() => result.current.addLifes(5));
    expect(result.current.lifes).toBe(10);
    act(() => result.current.resetLifes());
    expect(result.current.lifes).toBe(5);
  });

  test('useLifes min and max configs works', () => {
    const { result } = renderHook(() =>
      useLifes({ min: 10, max: 20, start: 10 })
    );
    expect(result.current.lifes).toBe(10);
    act(() => result.current.addLifes(-10));
    expect(result.current.lifes).toBe(10);
    act(() => result.current.addLifes(10));
    expect(result.current.lifes).toBe(20);
    act(() => result.current.addLifes(1));
    expect(result.current.lifes).toBe(20);
  });

  test('useLifes properly handles start value outside of min/max range', () => {
    const { result } = renderHook(() =>
      useLifes({ min: 10, max: 20, start: 5 })
    );
    expect(result.current.lifes).toBe(0);
  });
});
