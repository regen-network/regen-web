export default function sum(
  arr: { [key: string]: any }[],
  key: string,
): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (arr[i].hasOwnProperty(key)) {
      sum += parseFloat(arr[i][key]);
    }
  }
  return sum;
}
