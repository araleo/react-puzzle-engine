import { getRandomIntInRange } from '../../../src/lib/rng';

describe('rng functions tests', () => {
  test('getRandomIntInRange returns a number', () => {
    const res = getRandomIntInRange(0, 10);
    expect(typeof res).toBe('number');
  });

  test('checks getRandomIntInRange limits', () => {
    const all: number[] = [];

    for (let i = 0; i < 100000; i++) {
      all.push(getRandomIntInRange(0, 10));
    }

    const max = Math.max(...all);
    const min = Math.min(...all);
    expect(max).toBeLessThan(11);
    expect(min).toBeGreaterThanOrEqual(0);
  });


  test('checks getRandomIntInRange values', () => {
    const all: number[] = [];

    for (let i = 0; i < 100000; i++) {
      all.push(getRandomIntInRange(0, 3));
    }

    const unique = Array.from(new Set(all)).sort();
    expect(unique).toEqual([0, 1, 2, 3]);
  });
});
