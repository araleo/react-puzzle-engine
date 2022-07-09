import {
  secsToMs,
  msToMinsAndSecs,
  msToHoursMinsAndSecs,
  padStart,
  getSign,
} from '../../../hooks/use-stopwatch/lib';

describe('Stopwatch lib tests', () => {
  test('secsToMs properly converts right input', () => {
    const res = secsToMs(1, 0);
    expect(res).toEqual(1000);
  });

  test('secsToMs properly converts negative input to zero', () => {
    const res = secsToMs(-1, 1);
    expect(res).toEqual(0);
  });

  test('secsToMs returns fallback when input is undefined', () => {
    const res = secsToMs(undefined, 1);
    expect(res).toEqual(1);
  });

  test('msToMinsAndSecs properly converts right input without minutes', () => {
    const res = msToMinsAndSecs(1000);
    expect(res).toEqual('00:01');
  });

  test('msToMinsAndSecs properly converts right input with minutes', () => {
    const res = msToMinsAndSecs(3590000);
    expect(res).toEqual('59:50');
  });

  test('msToMinsAndSecs properly converts right input longer than one hour', () => {
    const res = msToMinsAndSecs(3670000);
    expect(res).toEqual('61:10');
  });

  test('msToHoursMinsAndSecs properly convers right input with seconds only', () => {
    const res = msToHoursMinsAndSecs(1000);
    expect(res).toEqual('00:00:01');
  });

  test('msToHoursMinsAndSecs properly convers right input with seconds and minutes', () => {
    const res = msToHoursMinsAndSecs(3590000);
    expect(res).toEqual('00:59:50');
  });

  test('msToHoursMinsAndSecs properly convers right input with seconds, minutes and hours', () => {
    const res = msToHoursMinsAndSecs(3670000);
    expect(res).toEqual('01:01:10');
  });

  test('padStart adds one leading zero to a single digit number', () => {
    const res = padStart(1);
    expect(res).toEqual('01');
  });

  test('padStart adds no zeros to a double digit number', () => {
    const res = padStart(10);
    expect(res).toEqual('10');
  });

  test('getSign returns 1 when ascending is true', () => {
    const res = getSign(true, -1);
    expect(res).toBe(1);
  });

  test('getSign returns -1 when ascending is false', () => {
    const res = getSign(false, 1);
    expect(res).toBe(-1);
  });

  test('getSign returns fallback when ascending is undefined', () => {
    const res = getSign(undefined, 1);
    expect(res).toBe(1);
  });
});
