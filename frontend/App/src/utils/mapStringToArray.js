/* generates a hash from a given string and maps it to a value
in an array.  Mapping item should be the same every time for a particular string
i.e initials
 */

export const mapStringToArray = (str, arr) => {
  return arr[getHashFromString(str) % arr.length];
};

export const getHashFromString = str => {
  let hash = 0;
  let i;
  let chr;

  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
