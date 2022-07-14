import useCounter from '../use-counter/use-counter';

const useScore = () => {
  const { counter, add, multiply, handleCounter } = useCounter({});

  return { counter, add, multiply, set: handleCounter };
};

export default useScore;
