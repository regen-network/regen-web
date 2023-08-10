/**
 * This function takes an array and an async function
 * you wish to apply to each array index until one index
 * returns true. It will then short-circuit, like Array.some.
 * This is useful when you want to avoid making extra
 * unnecessary async requests.
 */
export const asyncSome = async <T>(
  arr: T[],
  predicate: (arg: T) => {},
): Promise<boolean> => {
  for (let e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
};
