export type GetMeanPriceParams = {
  prices: number[];
};

export const computeMeanPrice = ({
  prices,
}: GetMeanPriceParams): number | undefined => {
  if (prices.length === 0) {
    return undefined;
  }
  const sum = prices.reduce((total, price) => total + price, 0);
  return sum / prices.length;
};
