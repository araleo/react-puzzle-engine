export type DisplayOptions = 'ms' | 'sec' | 'min' | 'hour';

export const secsToMs = (
  secs: number | undefined,
  fallback: number
): number => {
  if (secs === undefined) {
    return fallback;
  }
  return Math.max(secs * 1000, 0);
};

export const msToMinsAndSecs = (ms: number): string => {
  let secs = ms / 1000;
  const mins = Math.floor(secs / 60);
  secs = secs % 60;
  return `${padStart(mins)}:${padStart(secs)}`;
};

export const msToHoursMinsAndSecs = (ms: number): string => {
  let secs = ms / 1000;
  let mins = Math.floor(secs / 60);
  secs = secs % 60;
  const hours = Math.floor(mins / 60);
  mins = mins % 60;
  return `${padStart(hours)}:${padStart(mins)}:${padStart(secs)}`;
};

export const padStart = (num: number): string => {
  return num.toString().padStart(2, '0');
};

export const getSign = (
  ascending: boolean | undefined,
  fallback: 1 | -1
): 1 | -1 => {
  if (ascending === undefined) {
    return fallback;
  }
  return ascending ? 1 : -1;
};
