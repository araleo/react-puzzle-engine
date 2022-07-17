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

  useEffect(() => {
    const bombs = getNRandomXYs(BOMBS_AMOUNT, 0, SIZE - 1, 0, SIZE - 1);
    setBombCells(bombs);
  }, []);

  useEffect(() => {
    const newGrid = checkGridCellNeighbors(grid, bombCells);
    setGrid(newGrid);
  }, [bombCells]);

  console.log(bombCells);

  return (
    <>
      <h1>Minesweeper</h1>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className={style.row}>
          {row.map((column, columnIdx) => (
            <div key={columnIdx} className={style.cell}>
              {areCoordsOnArray([rowIdx, columnIdx], bombCells) ? 'X' : column}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Minesweeper;
