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
  max: Number.POSITIVE_INFINITY,
  start: 0,
};

const useCounter = (userConfig: CounterUserConfig) => {
  const [config, setConfig] = useState<CounterConfig>(defaultConfig);
  const [counter, setCounter] = useState<number>(defaultConfig.start);

  useEffect(() => {
    updateConfig(userConfig);
  }, []);

  useEffect(() => {
    setCounter(config.start);
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

  const updateConfig = (newConfig: CounterUserConfig) => {
    setConfig({
      min: newConfig.min || config.min,
      max: newConfig.max || config.max,
      start: newConfig.start || config.start,
    });
  };

  return { counter, add, multiply, handleCounter, updateConfig };
};

export default useCounter;
