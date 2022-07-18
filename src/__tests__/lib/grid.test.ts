import {
  areCoordsEqual,
  areCoordsOnArray,
  copyGrid,
  getCellNeighbors,
  isCellValid,
  make2dArray,
} from '../../lib/grid';

describe('Grid functions tests', () => {
  test('make2dArray retuns a 2d array with row and col dimensions', () => {
    const grid = make2dArray(3, 3);
    expect(grid.length).toBe(3);
    expect(grid[0].length).toBe(3);
    expect(grid[1].length).toBe(3);
    expect(grid[2].length).toBe(3);
  });

  test('make2dArray properly sets each element value to its index', () => {
    const grid = make2dArray(3, 3);
    expect(grid[0][0]).toBe(0);
    expect(grid[0][1]).toBe(1);
    expect(grid[0][2]).toBe(2);
    expect(grid[1][0]).toBe(3);
    expect(grid[1][1]).toBe(4);
    expect(grid[1][2]).toBe(5);
    expect(grid[2][0]).toBe(6);
    expect(grid[2][1]).toBe(7);
    expect(grid[2][2]).toBe(8);
  });

  test('make2dArray returns empty array when rows is 0', () => {
    const grid = make2dArray(0, 3);
    expect(grid).toEqual([]);
  });

  test('make2dArray returns an array of empty arrays when cols is 0', () => {
    const grid = make2dArray(3, 0);
    expect(grid.length).toBe(3);
    expect(grid[0]).toEqual([]);
    expect(grid[1]).toEqual([]);
    expect(grid[2]).toEqual([]);
  });

  test('copyGrid returns a copy of a 2d array', () => {
    const grid = make2dArray(3, 3);
    const copy = copyGrid(grid);
    expect(copy).not.toBe(grid);
    expect(copy).toEqual(grid);
  });

  test('copyGrid returns empty array when the input is an empty array', () => {
    const copy = copyGrid([]);
    expect(copy).toEqual([]);
  });

  test('copyGrid returns an array of empty arrays when the input is an array of empty arrays', () => {
    const copy = copyGrid([[], [], []]);
    expect(copy).toEqual([[], [], []]);
  });

  test('getCellNeighbors returns all 8 cell neighbors (including out of bounds)', () => {
    const neighbors = getCellNeighbors(0, 0);
    expect(neighbors.length).toBe(8);
    expect(neighbors[0]).toEqual([-1, -1]);
    expect(neighbors[1]).toEqual([-1, 0]);
    expect(neighbors[2]).toEqual([-1, 1]);
    expect(neighbors[3]).toEqual([0, -1]);
    expect(neighbors[4]).toEqual([0, 1]);
    expect(neighbors[5]).toEqual([1, -1]);
    expect(neighbors[6]).toEqual([1, 0]);
    expect(neighbors[7]).toEqual([1, 1]);
  });

  test('isCellValid finds inboud and outbound cells', () => {
    const grid = make2dArray(3, 3);
    const neighbors = getCellNeighbors(0, 0);
    expect(isCellValid(grid, neighbors[0][0], neighbors[0][1])).toBe(false);
    expect(isCellValid(grid, neighbors[1][0], neighbors[1][1])).toBe(false);
    expect(isCellValid(grid, neighbors[2][0], neighbors[2][1])).toBe(false);
    expect(isCellValid(grid, neighbors[3][0], neighbors[3][1])).toBe(false);
    expect(isCellValid(grid, neighbors[4][0], neighbors[4][1])).toBe(true);
    expect(isCellValid(grid, neighbors[5][0], neighbors[5][1])).toBe(false);
    expect(isCellValid(grid, neighbors[6][0], neighbors[6][1])).toBe(true);
    expect(isCellValid(grid, neighbors[7][0], neighbors[7][1])).toBe(true);
  });

  test('areCoordsEqual returns true when inputs are equal', () => {
    const a: [number, number] = [1, 2];
    const b: [number, number] = [1, 2];
    expect(areCoordsEqual(a, b)).toBe(true);
  });

  test('areCoordsEqual returns false when inputs arent equal', () => {
    const a: [number, number] = [1, 2];
    const b: [number, number] = [2, 1];
    expect(areCoordsEqual(a, b)).toBe(false);
  });

  test('areCoordsOnArray returns true if input coords are on input array and false otherwise', () => {
    const coords: [number, number][] = [
      [1, 2],
      [2, 3],
      [3, 4],
    ];
    const target1: [number, number] = [1, 2];
    const target2: [number, number] = [2, 1];
    expect(areCoordsOnArray(target1, coords)).toBe(true);
    expect(areCoordsOnArray(target2, coords)).toBe(false);
  });
});
