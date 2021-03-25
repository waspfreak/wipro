import { mapStringToArray, getHashFromString } from './mapStringToArray';

describe('mapStringToArray utils tests', () => {
  it('should generate the same hash for the same string', () => {
    expect(getHashFromString('test string')).toBe(
      getHashFromString('test string')
    );
    expect(getHashFromString('12345')).toBe(getHashFromString('12345'));
  });

  it('should return a number for any string', () => {
    expect(typeof getHashFromString('12345')).toBe('number');
    expect(typeof getHashFromString('hey there')).toBe('number');
  });

  it('should return an array item for any string', () => {
    const arr = [1, 2, 3, 4];
    const actual = mapStringToArray('test string', arr);
    expect(
      actual === 1 || actual === 2 || actual === 3 || actual === 4
    ).toBeTruthy();
  });
});
