import React from 'react';
import useScore from './hooks/use-score/use-score';
import useStopwatch from './hooks/use-stopwatch/use-stopwatch';

const App = () => {
  const score = useScore();
  const stopwatch = useStopwatch({});

  const updateConfig = () => {
    stopwatch.update({
      display: 'hour',
    });
  };

  return (
    <>
      <h1>Hello, React Puzzle Engine!</h1>

      <hr />

      <p>{stopwatch.current}</p>
      <p>{stopwatch.format()}</p>
      <button onClick={stopwatch.start}>Iniciar</button>
      <button onClick={stopwatch.reset}>Reset</button>
      <button onClick={stopwatch.stop}>Stop</button>
      <button onClick={updateConfig}>Update</button>

      <hr />

      <p>{score.counter}</p>
      <button onClick={() => score.add(10)}>Somar</button>
      <button onClick={() => score.add(-10)}>Subtrair</button>
      <button onClick={() => score.multiply(2)}>Dobrar</button>
      <button onClick={() => score.multiply(0.5)}>Metade</button>
      <button onClick={() => score.set(0)}>Zero</button>
    </>
  );
};

export default App;
