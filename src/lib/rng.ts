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
