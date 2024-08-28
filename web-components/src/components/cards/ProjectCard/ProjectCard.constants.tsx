import { ButtonType } from '../../../types/shared/buttonType';
import CurrentCreditsIcon from '../../icons/CurrentCreditsIcon';
import EyeIcon from '../../icons/EyeIcon';
import { PrefinanceIcon } from '../../icons/PrefinanceIcon';

export const ERROR_CARD_PRICE = 'Error fetching price';
export const SOLD_OUT = 'Sold Out';

export const DEFAULT_BUY_BUTTON: ButtonType = {
  text: 'Buy ecocredits',
  startIcon: <CurrentCreditsIcon height="24px" width="24px" />,
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
  className:
    '[border-image:linear-gradient(179deg,#515D89_19.77%,#7DC9BF_114.05%,#FAEBD1_200.67%)_1] text-purple-400 hover:bg-purple-100 hover:border-purple-100',
};
export const CREDITS_AVAILABLE = 'credits available';
export const PREFINANCE_PRICE_TOOLTIP =
  'Price of credits for prefinance projects have specific terms, please click on the project to learn more.';
export const ESTIMATED_ISSUANCE_TOOLTIP =
  'Actual number of credits issued may be different from the estimated issuance.';

export const VIEW_PROJECT_BUTTON: ButtonType = {
  text: 'view project',
  startIcon: <EyeIcon className="h-[24px] w-[24px]" />,
};
export const CREATE_POST_DISABLED_TOOLTIP =
  "You cannot make posts because either the project is still a draft or it doesn't have assigned a location.";
