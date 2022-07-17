import React, { useEffect, useState } from 'react';
import {
  areCoordsOnArray,
  checkGridCellNeighbors,
  getCellNeighbors,
  isCellValid,
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
    handleBombs();
  }, []);

  useEffect(() => {
    const newGrid = checkGridCellNeighbors(grid, bombCells);
    setGrid(newGrid);
  }, [bombCells]);

  const handleBombs = () => {
    const newBombs = getNRandomXYs(BOMBS_AMOUNT, 0, SIZE - 1, 0, SIZE - 1);
    setBombCells(newBombs);
  };

  const handleCellClick = (row: number, col: number) => {
    let neighbors: [number, number][] = [];
    const found: [number, number][] = [];
    const reveal: [number, number][] = [[row, col]];

    if (grid[row][col] === 0) {
      const cellNeighbors = getCellNeighbors(row, col);
      neighbors.push(...cellNeighbors);
      found.push(...cellNeighbors);
    }

    while (neighbors.length !== 0) {
      const current = neighbors[0];
      const [curRow, curCol] = current;
      neighbors = neighbors.slice(1);
      if (isCellValid(grid, curRow, curCol) && grid[curRow][curCol] === 0) {
        reveal.push(current);
        const currentNeighbors = getCellNeighbors(curRow, curCol);
        for (const curNeighbor of currentNeighbors) {
          if (!areCoordsOnArray(curNeighbor, found)) {
            found.push(curNeighbor);
            neighbors.push(curNeighbor);
          }
        }
      }
    }

    revealCells(reveal);
  };

  const revealCells = (cells: [number, number][]) => {
    const updated = [...revealed];
    for (const cell of cells) {
      if (!areCoordsOnArray(cell, updated)) {
        updated.push(cell);
      }
    }
    setRevealed(updated);
  };

  const handleReset = () => {
    setRevealed([]);
    handleBombs();
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
                className={[style.cell, isBomb ? style.bomb : ''].join(' ')}
              >
                {show ? display : ''}
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Minesweeper;
