type Params = {
  prices: number[];
};

export const computeMedianPrice = ({ prices }: Params) => {
  const middleIndex = Math.floor(prices.length / 2);
  if (prices.length === 0) {
    return undefined;
  } else if (prices.length % 2 === 0) {
    return (prices[middleIndex - 1] + prices[middleIndex]) / 2;
  } else {
    return prices[middleIndex];
  }
};
