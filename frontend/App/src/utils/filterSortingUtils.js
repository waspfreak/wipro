/* filters an array of objects by key value
 * eg. returns array of objects that have key value present */

export const filterByKeyValue = (dataToFilter, filterKey, filterValue) => {
  return !Array.isArray(dataToFilter)
    ? []
    : dataToFilter.filter(item => item[filterKey] === filterValue);
};

/* filters an array of objects by key value
 * then searches value for matching search string */

export const keyValueMatch = (dataToFilter, filterKey, filterValue) => {
  const searchForStringRegex = new RegExp(
    filterValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'gi'
  );

  return !Array.isArray(dataToFilter)
    ? []
    : dataToFilter.filter(item => item[filterKey].match(searchForStringRegex));
};

/* sorts an array of objects by key value alphabetically
 * eg. returns array of objects in alphabetical order of title key value */

export const sortAlphabeticallyByKeyValue = (dataToSort, filterType) => {
  return dataToSort.sort((a, b) =>
    a[filterType].localeCompare(b[filterType], 'en', { sensitivity: 'base' })
  );
};
