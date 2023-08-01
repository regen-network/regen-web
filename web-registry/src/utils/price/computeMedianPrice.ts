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

interface SellOrder {
  quantity: number;
  price: number;
}

export const calculateMedian = (sellOrders: SellOrder[]): number => {
  // calculate the cumulative quantities and prices
  let cumulativeQuantity = 0;
  const cumulativePrices: number[] = [];

  for (const order of sellOrders) {
    cumulativeQuantity += order.quantity;
    cumulativePrices.push(cumulativeQuantity * order.price);
  }

  // find the middle index
  const totalQuantity = cumulativeQuantity;
  const middleIndex = cumulativePrices.findIndex(
    price => price >= totalQuantity / 2,
  );

  // calculate the median
  if (totalQuantity % 2 === 1) {
    return cumulativePrices[middleIndex] / totalQuantity;
  } else {
    return (
      (cumulativePrices[middleIndex - 1] + cumulativePrices[middleIndex]) /
      (2 * totalQuantity)
    );
  }
};
