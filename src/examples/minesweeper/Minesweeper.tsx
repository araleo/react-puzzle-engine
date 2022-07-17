import React, { useEffect, useState } from 'react';
import { checkGridCellNeighbors, copyGrid, make2dArray } from '../../lib/grid';
import { getNRandomIntsInRange } from '../../lib/rng';
import style from './Minesweeper.module.css';

const SIZE = 10;
const BOMBS_AMOUNT = 10;

const Minesweeper = () => {
  const [grid, setGrid] = useState<number[][]>(make2dArray(SIZE, SIZE));
  const [bombCells, setBombCells] = useState<number[]>([]);

  useEffect(() => {
    const bombs = getNRandomIntsInRange(BOMBS_AMOUNT, 0, 99);
    setBombCells(bombs);
  }, []);

  const drawBoard = () => {
    const newGrid = checkGridCellNeighbors(grid, bombCells);
    setGrid(newGrid);
  };

  return (
    <>
      <h1>Minesweeper</h1>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className={style.row}>
          {row.map((cell, cellIdx) => (
            <div key={cellIdx} className={style.cell}>
              {bombCells.includes(cell) ? 'X' : cell}
            </div>
          ))}
        </div>
      ))}
      <button onClick={drawBoard}>Draw board</button>
    </>
  );
};

export default Minesweeper;
