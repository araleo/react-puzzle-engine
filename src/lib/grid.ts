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

export const areCoordsEqual = (
  a: [number, number],
  b: [number, number]
): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

export const checkGridCellNeighbors = (
  grid: number[][],
  targets: [number, number][]
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

export const getCellNeighbors = (
  row: number,
  column: number
): [number, number][] => {
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

export const isCellValid = (grid: number[][], row: number, col: number) => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

export const checkCell = (
  grid: number[][],
  row: number,
  col: number,
  targets: [number, number][]
): number => {
  if (!isCellValid(grid, row, col)) {
    return 0;
  }
  return areCoordsOnArray([row, col], targets) ? 1 : 0;
};

export const areCoordsOnArray = (
  target: [number, number],
  coords: [number, number][]
) => {
  for (const xy of coords) {
    if (areCoordsEqual(xy, target)) {
      return true;
    }
  }
  return false;
};
