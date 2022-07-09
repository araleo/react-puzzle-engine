import { useEffect, useState } from 'react';
import {
  DisplayOptions,
  getSign,
  msToHoursMinsAndSecs,
  msToMinsAndSecs,
  secsToMs,
} from './lib';
import useInterval from './use-interval';

interface StopwatchUserConfig {
  startAt?: number;
  stopAt?: number;
  autoStart?: boolean;
  ascending?: boolean;
  display?: DisplayOptions;
}

interface StopwatchConfig {
  startAt: number;
  stopAt: number;
  autoStart: boolean;
  sign: 1 | -1;
  display: DisplayOptions;
}

interface Stopwatch {
  current: number;
  running: boolean;
}

const defaultConfig: StopwatchConfig = {
  startAt: 0,
  stopAt: Number.POSITIVE_INFINITY,
  autoStart: false,
  sign: 1,
  display: 'sec',
};

const defaultStopwatch: Stopwatch = {
  current: defaultConfig.startAt,
  running: defaultConfig.autoStart,
};

const INTERVAL = 1000;

const useStopwatch = (userConfig: StopwatchUserConfig) => {
  const [config, setConfig] = useState<StopwatchConfig>(defaultConfig);
  const [stopwatch, setStopwatch] = useState<Stopwatch>(defaultStopwatch);

  useEffect(() => {
    updateConfig(userConfig);
  }, []);

  useEffect(() => {
    const state = { ...stopwatch };
    state.current = config.startAt;
    state.running = config.autoStart;
    setStopwatch(state);
  }, [config.startAt, config.autoStart]);

  const isRunning = (): boolean => {
    if (!stopwatch.running) {
      return false;
    } else if (config.sign === 1) {
      return stopwatch.current < config.stopAt;
    } else {
      return stopwatch.current > config.stopAt;
    }
  };

  useInterval(
    () => {
      const { sign } = config;
      const state = { ...stopwatch };
      state.current += INTERVAL * sign;
      setStopwatch(state);
    },
    isRunning() ? INTERVAL : null
  );

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

  const format = () => {
    const display = config.display;
    const ms = stopwatch.current;
    switch (display) {
      case 'sec':
        return (ms / 1000).toString();
      case 'min':
        return msToMinsAndSecs(ms);
      case 'hour':
        return msToHoursMinsAndSecs(ms);
      case 'ms':
      default:
        return ms.toString();
    }
  };

  const updateConfig = (userConfig: StopwatchUserConfig) => {
    const newConfig: StopwatchConfig = {
      startAt: secsToMs(userConfig.startAt, config.startAt),
      stopAt: secsToMs(userConfig.stopAt, config.stopAt),
      autoStart: userConfig.autoStart || config.autoStart,
      sign: getSign(userConfig.ascending, config.sign),
      display: userConfig.display || config.display,
    };
    setConfig(newConfig);
  };

  return {
    current: stopwatch.current,
    start,
    reset,
    stop,
    update: updateConfig,
    format,
  };
};

export default useStopwatch;
