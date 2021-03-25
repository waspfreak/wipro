/* returns initials when given first and last names */

export const initialsFromName = name => {
  const nameArray = name.split(' ');
  const names = [nameArray[0]];
  if (nameArray.length > 1) {
    names.push(nameArray[nameArray.length - 1]);
  }
  let initials = '';
  names.forEach(name => {
    initials += name.charAt(0);
  });

  return initials.toUpperCase();
};
