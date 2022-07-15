import { useEffect, useState } from 'react';

export interface CounterConfig {
  min: number;
  max: number;
  start: number;
}

export interface CounterUserConfig {
  min?: number;
  max?: number;
  start?: number;
}

const defaultConfig = {
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
  start: 0,
};

const useCounter = (userConfig?: CounterUserConfig) => {
  const [config, setConfig] = useState<CounterConfig>(defaultConfig);
  const [counter, setCounter] = useState<number>(defaultConfig.start);

  useEffect(() => {
    if (userConfig !== undefined) {
      updateConfig(userConfig);
    }
  }, []);

  useEffect(() => {
    handleCounter(config.start);
  }, [config.start]);

  const handleCounter = (newCounter: number) => {
    if (newCounter >= config.min && newCounter <= config.max) {
      setCounter(newCounter);
    }
  };

  const add = (value: number) => {
    handleCounter(counter + value);
  };

  const multiply = (value: number) => {
    handleCounter(counter * value);
  };

  const reset = () => {
    handleCounter(config.start);
  };

  const updateConfig = (newConfig: CounterUserConfig) => {
    setConfig({
      min: newConfig.min || config.min,
      max: newConfig.max || config.max,
      start: newConfig.start || config.start,
    });
  };

  return { counter, add, multiply, reset, handleCounter, updateConfig };
};

export default useCounter;
