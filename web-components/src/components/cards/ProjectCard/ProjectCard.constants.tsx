import CurrentCreditsIcon from '../../../components/icons/CurrentCreditsIcon';
import { ButtonType } from '../../../types/shared/buttonType';

export const ERROR_CARD_PRICE = 'Error fetching price';
export const SOLD_OUT = 'Sold Out';
export const DEFAULT_BUY_BUTTON: ButtonType = {
  text: 'Buy ecocredits',
  startIcon: <CurrentCreditsIcon height="18px" width="18px" />,
};
export const AVG_PRICE_LABEL = 'Avg Price';
export const AVG_PRICE_TOOLTIP =
  'This is the median average price of all open sell orders for this project.';
