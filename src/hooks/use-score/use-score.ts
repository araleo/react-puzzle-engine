import useCounter, { CounterUserConfig } from '../use-counter/use-counter';

const useScore = (userConfig?: CounterUserConfig) => {
  const { counter, add, multiply, handleCounter, reset } =
    useCounter(userConfig);

  return {
    score: counter,
    addScore: add,
    multiplyScore: multiply,
    setScore: handleCounter,
    resetScore: reset,
  };
};

export default useScore;
