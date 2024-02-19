import { ButtonType } from '../../../types/shared/buttonType';
import CurrentCreditsIcon from '../../icons/CurrentCreditsIcon';
import { PrefinanceIcon } from '../../icons/PrefinanceIcon';

export const ERROR_CARD_PRICE = 'Error fetching price';
export const SOLD_OUT = 'Sold Out';
export const DEFAULT_BUY_BUTTON: ButtonType = {
  text: 'Buy ecocredits',
  startIcon: <CurrentCreditsIcon height="18px" width="18px" />,
};
export const AVG_PRICE_LABEL = 'Avg Price';
export const AVG_PRICE_TOOLTIP =
  'This is the median average price of all open sell orders for this project.';
export const PREFINANCE = 'prefinance';
export const PRICE = 'price';
export const ESTIMATED_ISSUANCE = 'estimated issuance';
export const PREFINANCE_BUTTON: ButtonType = {
  text: 'prefinance this project',
  startIcon: <PrefinanceIcon height="24px" width="24px" />,
  className: 'text-purple-400',
};
export const CREDITS_AVAILABLE = 'credits available';
