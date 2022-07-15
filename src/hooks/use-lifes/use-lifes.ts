import useCounter from '../use-counter/use-counter';

const useLifes = () => {
  const { counter, add, multiply, handleCounter } = useCounter({});

  return { counter, add, multiply, set: handleCounter };
};

export default useLifes;
