import { initialsFromName } from './initialsFromName';

describe('initialsFromName utils tests', () => {
  it('should return the initials of more than two names', () => {
    const result = initialsFromName('John Woodrow Thomas Harts');
    expect(result).toBe('JH');
  });

  it('should return the initials of a name', () => {
    const result = initialsFromName('Mark Barry');
    expect(result).toBe('MB');
  });

  it('should return the initials of a name with special characters', () => {
    const result = initialsFromName(`Natasha D'Souza`);
    expect(result).toBe('ND');
  });

  it('should return the initials of a single name', () => {
    const result = initialsFromName('Katie');
    expect(result).toBe('K');
  });
});
