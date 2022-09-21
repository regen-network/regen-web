type RoundFloatNumberParams = {
  number: number;
  decimals?: number;
};

export const roundFloatNumber = ({
  number,
  decimals = 2,
}: RoundFloatNumberParams): number => {
  const base = Math.pow(10, decimals);
  return Math.round(number * base) / base;
};
