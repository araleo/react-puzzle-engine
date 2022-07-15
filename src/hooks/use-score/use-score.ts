import useCounter, { CounterUserConfig } from '../use-counter/use-counter';

const useScore = (userConfig?: CounterUserConfig) => {
  const { counter, add, multiply, handleCounter } = useCounter(userConfig);

  return {
    score: counter,
    addScore: add,
    multiplyScore: multiply,
    setScore: handleCounter,
  };
};

export default useScore;
