import { trimStringTolength } from './stringUtils';

describe('mapStringToArray utils tests', () => {
  it('should truncate string if more than given length and add ... to the end', () => {
    expect(
      trimStringTolength(
        'this sentence is too long and needs to be shortened',
        10
      )
    ).toBe('this se...');
  });
  it('should return given string if shorter than max', () => {
    expect(trimStringTolength('This sentence.', 100)).toBe('This sentence.');
  });
});
