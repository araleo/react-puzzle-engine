import useCounter, {
  CounterConfig,
  CounterUserConfig,
} from '../use-counter/use-counter';

const defaultLifeConfigs: CounterConfig = {
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
  start: 3,
};

const useLifes = (userConfig?: CounterUserConfig) => {
  const { counter, add, multiply, handleCounter } = useCounter(
    userConfig || defaultLifeConfigs
  );

  return {
    lifes: counter,
    addLifes: add,
    multiplyLifes: multiply,
    setLifes: handleCounter,
  };
};

export default useLifes;
