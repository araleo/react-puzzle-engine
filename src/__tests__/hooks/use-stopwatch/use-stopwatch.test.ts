import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useStopwatch from '../../../hooks/use-stopwatch/use-stopwatch';

describe('useStopwatch hook tests', () => {
  test('useStopwatch loads with the default configs', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.current).toBe(0);
  });

  test('stopwatch runs after start is called', async () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.isRunning).toBe(false);
    await act(async () => result.current.start());
    expect(result.current.isRunning).toBe(true);
  });

  test('stopwatch stops running after stop is called', async () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.isRunning).toBe(false);
    await act(async () => result.current.start());
    expect(result.current.isRunning).toBe(true);
    await act(async () => result.current.stop());
    expect(result.current.isRunning).toBe(false);
  });
});
