import React from 'react';
import useStopwatch from './hooks/use-stopwatch/use-stopwatch';

function App() {
  const stopwatch = useStopwatch({ ascending: false });

  const updateConfig = () => {
    stopwatch.updateConfig({ display: 'min', autoStart: true });
  };

  return (
    <>
      <h1>Hello, React Puzzle Engine!</h1>
      <p>{stopwatch.watch}</p>
      <button onClick={() => stopwatch.start()}>Iniciar</button>
      <button onClick={() => stopwatch.reset()}>Reset</button>
      <button onClick={() => stopwatch.stop()}>Stop</button>
      <button onClick={updateConfig}>Update</button>
    </>
  );
}

export default App;
