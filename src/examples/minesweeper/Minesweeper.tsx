import React, { useEffect, useState } from 'react';
import {
  areCoordsOnArray,
  checkGridCellNeighbors,
  make2dArray,
} from '../../lib/grid';
import { getNRandomXYs } from '../../lib/rng';
import style from './Minesweeper.module.css';

const SIZE = 10;
const BOMBS_AMOUNT = 10;

const Minesweeper = () => {
  const [grid, setGrid] = useState<number[][]>(make2dArray(SIZE, SIZE));
  const [bombCells, setBombCells] = useState<[number, number][]>([]);
  const [revealed, setRevealed] = useState<[number, number][]>([]);

  useEffect(() => {
    const bombs = getNRandomXYs(BOMBS_AMOUNT, 0, SIZE - 1, 0, SIZE - 1);
    setBombCells(bombs);
  }, []);

  useEffect(() => {
    const newGrid = checkGridCellNeighbors(grid, bombCells);
    setGrid(newGrid);
  }, [bombCells]);

  const handleCellClick = (row: number, col: number) => {
    if (!areCoordsOnArray([row, col], revealed)) {
      const updated = [...revealed];
      updated.push([row, col]);
      setRevealed(updated);
    }
  };

  return (
    <>
      <h1>Minesweeper</h1>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className={style.row}>
          {row.map((cell, colIdx) => {
            const coords: [number, number] = [rowIdx, colIdx];
            const isBomb = areCoordsOnArray(coords, bombCells);
            const show = areCoordsOnArray(coords, revealed);
            const display = isBomb ? 'X' : cell;

            return (
              <div
                key={colIdx}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                className={style.cell}
              >
                {show ? display : ''}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Minesweeper;
