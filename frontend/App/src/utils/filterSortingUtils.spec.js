import {
  filterByKeyValue,
  sortAlphabeticallyByKeyValue,
  keyValueMatch
} from './filterSortingUtils';

const testArrayOfObjects = [
  { type: 'type1', title: 'def' },
  { type: 'type1', title: 'abc' },
  { type: 'type1', title: '1234' },
  { type: 'type1', title: ')(*&^%$£@!' },
  { type: 'type2', title: 'xyz' },
  { type: 'type2', title: 'mno' },
  { type: 'type 3', title: '@£$@aev' },
  { type: 'type 3', title: 'abc£$@aev title with words' },
  { type: 'type 3', title: '   abc' }
];
describe('filter and sort utils tests', () => {
  it('should filter by key value and match by given string', () => {
    const expectedResult = [
      {
        title: 'abc',
        type: 'type1'
      },
      { type: 'type 3', title: 'abc£$@aev title with words' },
      { type: 'type 3', title: '   abc' }
    ];
    const result = keyValueMatch(testArrayOfObjects, 'title', 'abc');
    expect(result).toEqual(expectedResult);
  });

  it('should filter by key value and special char that can break regex', () => {
    const expectedResult = [{ type: 'type1', title: ')(*&^%$£@!' }];
    const result = keyValueMatch(testArrayOfObjects, 'title', '(');
    expect(result).toEqual(expectedResult);
  });

  it('should filter by key value and match by given string with special characters', () => {
    const expectedResult = [
      {
        title: ')(*&^%$£@!',
        type: 'type1'
      },
      {
        title: '@£$@aev',
        type: 'type 3'
      },
      {
        title: 'abc£$@aev title with words',
        type: 'type 3'
      }
    ];
    const result = keyValueMatch(testArrayOfObjects, 'title', '@');
    expect(result).toEqual(expectedResult);
  });

  it('should filter and array of objects by given key and value', () => {
    const expectedResult = [
      { type: 'type2', title: 'xyz' },
      { type: 'type2', title: 'mno' }
    ];
    const result = filterByKeyValue(testArrayOfObjects, 'type', 'type2');
    expect(result).toEqual(expectedResult);
  });

  it('should return empty array if first param is not array', () => {
    const expectedResult = [];
    const result = filterByKeyValue('test', 'type', 'type2');
    expect(result).toEqual(expectedResult);
  });

  it('should filter and array of objects by given key and value with special characters', () => {
    const expectedResult = [
      { type: 'type1', title: 'def' },
      { type: 'type1', title: 'abc' },
      { type: 'type1', title: '1234' },
      { type: 'type1', title: ')(*&^%$£@!' }
    ];
    const result = filterByKeyValue(testArrayOfObjects, 'type', 'type1');
    expect(result).toEqual(expectedResult);
  });

  it('should sort an array of objects alphabetically by key value', () => {
    const expectedResult = [
      {
        title: '   abc',
        type: 'type 3'
      },
      {
        title: ')(*&^%$£@!',
        type: 'type1'
      },
      {
        title: '@£$@aev',
        type: 'type 3'
      },
      {
        title: '1234',
        type: 'type1'
      },
      {
        title: 'abc',
        type: 'type1'
      },
      {
        title: 'abc£$@aev title with words',
        type: 'type 3'
      },
      {
        title: 'def',
        type: 'type1'
      },
      {
        title: 'mno',
        type: 'type2'
      },
      {
        title: 'xyz',
        type: 'type2'
      }
    ];
    const result = sortAlphabeticallyByKeyValue(testArrayOfObjects, 'title');
    expect(result).toEqual(expectedResult);
  });
});
