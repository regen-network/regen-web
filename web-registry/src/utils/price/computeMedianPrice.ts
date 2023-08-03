export interface Order {
  quantity: number;
  usdPrice: number;
}

export const computeMedianPrice = (orders: Order[]): number => {
  // flatten sell orders into an array of individual prices
  const prices: number[] = [];
  for (const order of orders) {
    // NOTE: the following assumes a maximum precision of 6
    // for (let i = 0; i < order.quantity; i += 0.000001) {
    //   prices.push(order.usdPrice);
    // }
    // NOTE: the following assumes a maximum precision of 2
    for (let i = 0; i < order.quantity; i += 0.01) {
      prices.push(order.usdPrice);
    }
  }

  // sort prices in ascending order
  prices.sort((a, b) => a - b);

  // find the middle index
  const middleIndex = Math.floor(prices.length / 2);

  // calculate the median
  if (prices.length % 2 === 1) {
    return prices[middleIndex];
  } else {
    return (prices[middleIndex - 1] + prices[middleIndex]) / 2;
  }
};
