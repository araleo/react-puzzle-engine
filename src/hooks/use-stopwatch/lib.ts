export type DisplayOptions = 'ms' | 'sec' | 'min' | 'hour';

export const format = (ms: number, display: DisplayOptions): string => {
  switch (display) {
    case 'sec':
      return (ms / 1000).toString();
    case 'min':
      return msToMinsAndSecs(ms);
    case 'hour':
      return msToHoursMinsAndSecs(ms);
    case 'ms':
    default:
      return ms.toString();
  }
};

export const msToMinsAndSecs = (ms: number): string => {
  const date = new Date(ms);
  const mins = date.getUTCMinutes().toString().padStart(2, '0');
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export const msToHoursMinsAndSecs = (ms: number): string => {
  const date = new Date(ms);
  const hour = date.getUTCHours().toString().padStart(2, '0');
  const mins = date.getUTCMinutes().toString().padStart(2, '0');
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hour}:${mins}:${secs}`;
};