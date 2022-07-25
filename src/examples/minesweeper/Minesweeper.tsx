import React, { useEffect, useState } from 'react';
import useGameState, {
  GameState,
} from '../../hooks/use-game-state/use-game-state';
import {
  areCoordsEqual,
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
  const [safeCells, setSafeCells] = useState<[number, number][]>([]);

  const { gameState, start, end } = useGameState(GameState.Running);

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
    if (
      gameState !== GameState.Running ||
      areCoordsOnArray([row, col], safeCells)
    ) {
      return;
    }

    let reveal: [number, number][] = [[row, col]];

    if (grid[row][col] === 0) {
      reveal = findZeroNeighbors(row, col);
    }

    if (areCoordsOnArray([row, col], bombCells)) {
      reveal = bombCells;
      end();
    }

    revealCells(reveal);
  };

  const handleSafeCell = (row: number, col: number) => {
    const xy: [number, number] = [row, col];
    let safe = [...safeCells];
    if (!areCoordsOnArray(xy, safe)) {
      safe.push(xy);
    } else {
      safe = safe.filter((cur) => !areCoordsEqual(cur, xy));
    }
    setSafeCells(safe);
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
    setSafeCells([]);
    handleBombs();
    start();
  };

  const findZeroNeighbors = (startingRow: number, startingCol: number) => {
    let neighbors: [number, number][] = [];
    const found: [number, number][] = [];
    const reveal: [number, number][] = [[startingRow, startingCol]];

    const cellNeighbors = getCellNeighbors(startingRow, startingCol);
    neighbors.push(...cellNeighbors);
    found.push(...cellNeighbors);
    while (neighbors.length !== 0) {
      const current = neighbors[0];
      neighbors = neighbors.slice(1);
      const [curRow, curCol] = current;
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

    return reveal;
  };

  return (
    <>
      <h1>Minesweeper</h1>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className={style.row}>
          {row.map((cell, colIdx) => {
            const coords: [number, number] = [rowIdx, colIdx];
            const isBomb = areCoordsOnArray(coords, bombCells);
            const isSafe = areCoordsOnArray(coords, safeCells);
            const show = areCoordsOnArray(coords, revealed);
            const display = isBomb ? 'X' : cell;
            const showAllBombs = gameState === GameState.End;

            return (
              <div
                key={colIdx}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  handleSafeCell(rowIdx, colIdx);
                }}
                className={[
                  style.cell,
                  isSafe ? style.safe : '',
                  isBomb && showAllBombs ? style.bomb : '',
                ].join(' ')}
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
