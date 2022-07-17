export const make2dArray = (rows: number, cols: number): number[][] => {
  const grid: number[][] = [];
  let cell = 0;
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = cell;
      cell++;
    }
  }
  return grid;
};

export const copyGrid = (grid: number[][]): number[][] => {
  const newGrid = [];
  for (const row of grid) {
    newGrid.push([...row]);
  }
  return newGrid;
};

export const checkGridCellNeighbors = (
  grid: number[][],
  targets: number[]
): number[][] => {
  const newGrid = copyGrid(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let count = 0;
      const neighbors = getCellNeighbors(i, j);
      for (const neighbor of neighbors) {
        count += checkCell(grid, neighbor[0], neighbor[1], targets);
      }
      newGrid[i][j] = count;
    }
  }
  return newGrid;
};

const getCellNeighbors = (row: number, column: number): [number, number][] => {
  return [
    [row - 1, column - 1],
    [row - 1, column],
    [row - 1, column + 1],
    [row, column - 1],
    [row, column + 1],
    [row + 1, column - 1],
    [row + 1, column],
    [row + 1, column + 1],
  ];
};

const checkCell = (
  grid: number[][],
  row: number,
  column: number,
  targets: number[]
): number => {
  if (row < 0 || row >= grid.length || column < 0 || column >= grid[0].length) {
    return 0;
  }
  return targets.includes(grid[row][column]) ? 1 : 0;
};
