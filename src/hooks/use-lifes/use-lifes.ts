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
  const { counter, add, multiply, handleCounter, reset } = useCounter(
    userConfig || defaultLifeConfigs
  );

  const addOne = () => {
    add(1);
  };

  const takeOne = () => {
    add(-1);
  };

  return {
    lifes: counter,
    addLifes: add,
    multiplyLifes: multiply,
    addOneLife: addOne,
    takeOneLife: takeOne,
    setLifes: handleCounter,
    resetLifes: reset,
  };
};

export default useLifes;
