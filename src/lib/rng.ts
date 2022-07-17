import { areCoordsOnArray } from './grid';

export const getRandomIntInRange = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNRandomIntsInRange = (
  n: number,
  min: number,
  max: number
): number[] => {
  if (max - min < n) {
    return [];
  }

  const nums: number[] = [];
  while (nums.length < n) {
    const rand = getRandomIntInRange(min, max);
    if (!nums.includes(rand)) {
      nums.push(rand);
    }
  }
  return nums;
};

export const getRandomXY = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): [number, number] => {
  const x = getRandomIntInRange(minX, maxX);
  const y = getRandomIntInRange(minY, maxY);
  return [x, y];
};

export const getNRandomXYs = (
  n: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): [number, number][] => {
  const coords: [number, number][] = [];
  while (coords.length < n) {
    const rand = getRandomXY(minX, maxX, minY, maxY);
    if (!areCoordsOnArray(rand, coords)) {
      coords.push(rand);
    }
  }
  return coords;
};

