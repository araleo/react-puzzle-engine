import { act, renderHook } from '@testing-library/react';
import useCounter from '../../../hooks/use-counter/use-counter';

describe('useCounter hook tests', () => {
  test('useCounter loads with the default configs', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(0);
  });

  test('useCounter loads with the custom config', () => {
    const { result } = renderHook(() => useCounter({ start: 10 }));
    expect(result.current.counter).toBe(10);
  });

  test('useCounter add works for sums', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(0);
    act(() => result.current.add(10));
    expect(result.current.counter).toBe(10);
  });

  test('useCounter add works for subtractions', () => {
    const { result } = renderHook(() => useCounter({start: 10}));
    expect(result.current.counter).toBe(10);
    act(() => result.current.add(-10));
    expect(result.current.counter).toBe(0);
  });

  test('useCounter multiply works for products', () => {
    const { result } = renderHook(() => useCounter({start: 2}));
    expect(result.current.counter).toBe(2);
    act(() => result.current.multiply(8));
    expect(result.current.counter).toBe(16);
  });

  test('useCounter multiply works for divisions', () => {
    const { result } = renderHook(() => useCounter({start: 10}));
    expect(result.current.counter).toBe(10);
    act(() => result.current.multiply(0.5));
    expect(result.current.counter).toBe(5);
  });

  test('useCounter handleCounter sets a new value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(0);
    act(() => result.current.handleCounter(10));
    expect(result.current.counter).toBe(10);
  });

  test('useCounter respects min and max config options', () => {
    const { result } = renderHook(() =>
      useCounter({ start: 5, min: 0, max: 10 })
    );

    expect(result.current.counter).toBe(5);
    act(() => result.current.add(10));
    expect(result.current.counter).toBe(5);
    act(() => result.current.add(-10));
    expect(result.current.counter).toBe(5);
    act(() => result.current.multiply(10));
    expect(result.current.counter).toBe(5);
  });

  test('useCounter updateConfig works', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(0);
    act(() => result.current.add(100));
    expect(result.current.counter).toBe(100);
    act(() => result.current.updateConfig({start: 10, max: 50}));
    expect(result.current.counter).toBe(10);
    act(() => result.current.add(100));
    expect(result.current.counter).toBe(10);
  });
});
