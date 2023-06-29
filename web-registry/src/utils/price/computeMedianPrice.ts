type Params = {
  prices: number[];
};

export const computeMedianPrice = ({ prices }: Params) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedPrices.length / 2);
  if (sortedPrices.length === 0) {
    return undefined;
  } else if (sortedPrices.length % 2 === 0) {
    return (sortedPrices[middleIndex - 1] + sortedPrices[middleIndex]) / 2;
  } else {
    return sortedPrices[middleIndex];
  }
};
