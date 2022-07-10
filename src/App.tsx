import React from 'react';
import useStopwatch from './hooks/use-stopwatch/use-stopwatch';

const App = () => {
  const stopwatch = useStopwatch({});

  const updateConfig = () => {
    stopwatch.update({
      display: 'hour',
    });
  };

  return (
    <>
      <h1>Hello, React Puzzle Engine!</h1>
      <p>{stopwatch.current}</p>
      <p>{stopwatch.format()}</p>
      <button onClick={stopwatch.start}>Iniciar</button>
      <button onClick={stopwatch.reset}>Reset</button>
      <button onClick={stopwatch.stop}>Stop</button>
      <button onClick={updateConfig}>Update</button>
    </>
  );
};

export default App;
