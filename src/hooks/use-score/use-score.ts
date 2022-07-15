import useCounter from '../use-counter/use-counter';

const useScore = () => {
  const { counter, add, multiply, handleCounter } = useCounter({start: 0});

  return { counter, add, multiply, set: handleCounter };
};

export default useScore;
