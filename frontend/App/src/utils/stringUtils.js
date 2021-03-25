export const trimStringTolength = (stringToTrim, toLength) => {
  return stringToTrim.length > toLength
    ? stringToTrim.substring(0, toLength - 3) + '...'
    : stringToTrim;
};
