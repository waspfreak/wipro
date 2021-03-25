/* accepts a number and generates that number of random alphabetical initials as array */

export const generateArrayOfFakeInitials = (num = 0) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetter = () => alphabet.split('')[Math.floor(Math.random() * 26)];
  return Array(num)
    .fill()
    .map(() => `${randomLetter()} ${randomLetter()}`);
};
