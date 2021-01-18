export default function sum(arr: { [key: string]: any }[], key: string): number {
  let sum: number = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].hasOwnProperty(key)) {
      sum += parseFloat(arr[i][key]);
    }
  }
  return sum;
}
