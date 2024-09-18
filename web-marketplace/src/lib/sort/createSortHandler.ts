/* eslint-disable lingui/no-unlocalized-strings */
type SortArgType = string | number;
function isSortArgType(a: unknown): a is SortArgType {
  return typeof a === 'string' || typeof a === 'number';
}

export function createSortHandler<T>(
  sortFn: (a: SortArgType, b: SortArgType) => number,
) {
  return (key: keyof T, transformFn?: (a: unknown) => SortArgType) => {
    return (a: T, b: T): number => {
      const aVal = transformFn ? transformFn(a[key]) : a[key];
      const bVal = transformFn ? transformFn(b[key]) : b[key];
      if (!isSortArgType(aVal) || !isSortArgType(bVal)) {
        throw new Error(`Invalid sort argument type`);
      }
      return sortFn(aVal, bVal);
    };
  };
}

export function createAscSortHandler<T>() {
  return createSortHandler<T>((a, b) => {
    if (a > b) return 1; // sort a after b
    if (a < b) return -1; // sort a before b
    return 0;
  });
}

export function createDescSortHandler<T>() {
  return createSortHandler<T>((a, b) => {
    if (a < b) return 1; // sort a before b
    if (a > b) return -1; // sort a afer b
    return 0;
  });
}
