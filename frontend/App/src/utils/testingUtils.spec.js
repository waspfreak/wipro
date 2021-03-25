import { generateArrayOfFakeInitials } from './testingUtils';

describe('testing utils tests', () => {
  it('should generate random initials from given number and return array', () => {
    const initials = generateArrayOfFakeInitials(5);
    /* check for length of returned array */
    expect(initials.length).toBe(5);
    /* check for length of first item */
    expect(initials[0].length).toBe(3);
    /* check first initials are separated by space */
    expect(initials[1][1]).toBe(' ');
  });
});
