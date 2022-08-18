import {
  formatDenomText,
  microToDenom,
} from 'pages/Marketplace/Marketplace.utils';
import { ISellOrderInfo } from 'pages/Marketplace/Projects/Projects.types';

export const getSellOrderLabel = (sellOrder: ISellOrderInfo): string => {
  const { id, askAmount, askDenom = '', quantity } = { ...sellOrder };
  const denom = formatDenomText(askDenom);
  const price = microToDenom(askAmount);
  return `${id} (${price} ${denom}/credit: ${quantity} credit(s) available)`;
};
