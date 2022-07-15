import React, { useState } from 'react';
import useLifes from '../../hooks/use-lifes/use-lifes';
import useScore from '../../hooks/use-score/use-score';
import { getRandomIntInRange } from '../../lib/rng';

const GuessingGame = () => {
  const [secret, setSecret] = useState<number>(getRandomIntInRange(1, 100));
  const [guess, setGuess] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const { lifes, takeOneLife, resetLifes } = useLifes({ start: 10 });
  const { score, addScore } = useScore();

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    if (newValue >= 0 && newValue <= 100) {
      setGuess(+newValue);
    }
  };

  const handleGuess = () => {
    let newResult: string;
    if (guess === secret) {
      newResult = 'You win!';
      addScore(10 * lifes);
    } else if (guess < secret) {
      newResult = 'Too low';
      takeOneLife();
    } else {
      newResult = 'Too high';
      takeOneLife();
    }
    setResult(newResult);
  };

  const handleReset = () => {
    setSecret(getRandomIntInRange(1, 100));
    setGuess(0);
    setResult('');
    resetLifes();
  };

  return (
    <>
      <h1>Guessing game</h1>

      <h3>I am thinking of a number. Can you guess which one?</h3>
      <p>Tries: {lifes} | Score: {score}</p>

      {lifes > 0 ? (
        <>
          <p>{result}</p>
          <input
            type='number'
            min={1}
            max={100}
            value={guess}
            onChange={handleGuessChange}
          />
          <button onClick={handleGuess}>Guess</button>{' '}
        </>
      ) : (
        <p>You lose!</p>
      )}

      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default GuessingGame;
