export const asyncSome = async (
  arr: any[],
  predicate: (e: any) => {},
): Promise<boolean> => {
  for (let e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
};
