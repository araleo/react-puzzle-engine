import { useEffect, useState } from 'react';
import { DisplayOptions, format } from './lib';
import useInterval from './use-interval';

interface StopwatchUserConfig {
  startAt?: number;
  stopAt?: number;
  interval?: number;
  autoStart?: boolean;
  ascending?: boolean;
  display?: DisplayOptions;
}

interface StopwatchConfig {
  startAt: number;
  stopAt: number;
  interval: number;
  autoStart: boolean;
  ascending: boolean;
  display: DisplayOptions;
}

interface Stopwatch {
  current: number;
  running: boolean;
}

const defaultConfig: StopwatchConfig = {
  startAt: 0,
  stopAt: Number.POSITIVE_INFINITY,
  interval: 1000,
  autoStart: false,
  ascending: true,
  display: 'sec',
};

const defaultStopwatch: Stopwatch = {
  current: defaultConfig.startAt,
  running: defaultConfig.autoStart,
};

const useStopwatch = (userConfig: StopwatchUserConfig) => {
  const [watch, setWatch] = useState<string>('');
  const [config, setConfig] = useState<StopwatchConfig>(defaultConfig);
  const [stopwatch, setStopwatch] = useState<Stopwatch>(defaultStopwatch);

  useEffect(() => {
    updateConfig(userConfig);
  }, []);

  useEffect(() => {
    const newStopwatch: Stopwatch = {
      current: config.startAt,
      running: config.autoStart,
    };
    setStopwatch(newStopwatch);
  }, [config]);

  useEffect(() => {
    setWatch(format(stopwatch.current, config.display));
  }, [stopwatch.current]);

  useInterval(() => {
    const { running, current } = stopwatch;
    const { interval, ascending } = config;

    if (running) {
      const state = { ...stopwatch };
      const sign = ascending ? 1 : -1;
      state.current = current + interval * sign;
      setStopwatch(state);
    }
  }, config.interval);

  const start = () => {
    const state = { ...stopwatch };
    state.running = true;
    setStopwatch(state);
  };

  const reset = () => {
    const state = { ...stopwatch };
    state.current = config.startAt;
    setStopwatch(state);
  };

  const stop = () => {
    const state = { ...stopwatch };
    state.running = false;
    setStopwatch(state);
  };

  const updateConfig = (userConfig: StopwatchUserConfig) => {
    const newConfig: StopwatchConfig = {
      startAt: userConfig.startAt || config.startAt,
      stopAt: userConfig.stopAt || config.stopAt,
      interval: userConfig.interval || config.interval,
      autoStart: userConfig.autoStart || config.autoStart,
      ascending: userConfig.ascending || config.ascending,
      display: userConfig.display || config.display,
    };
    setConfig(newConfig);
  };

  return { watch, start, reset, stop, updateConfig };
};

export default useStopwatch;
