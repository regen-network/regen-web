import { BrokenLinkIcon } from 'web-components/lib/components/icons/BrokenLinkIcon';
import RegenNotFoundIcon from 'web-components/lib/components/icons/RegenNotFoundIcon';
import SellOrderNotFoundIcon from 'web-components/lib/components/icons/SellOrderNotFoundIcon';

export enum ERRORS {
  DEFAULT = 'default',
  SELL_ORDER_PURCHASED = 'sell_order_purchased',
  NOT_ENOUGH_REGEN_FEES = 'not_enough_regen_fees',
}

export const errorsMapping: Record<
  ERRORS,
  {
    title: string;
    description?: string;
    buttonTitle?: string;
    buttonLink?: string;
    icon: (props: any) => JSX.Element;
  }
> = {
  [ERRORS.DEFAULT]: {
    title: 'Sorry, something went wrong!',
    icon: BrokenLinkIcon,
  },
  [ERRORS.SELL_ORDER_PURCHASED]: {
    title: 'Sorry, someone has purchased this sell order!',
    icon: SellOrderNotFoundIcon,
  },
  [ERRORS.NOT_ENOUGH_REGEN_FEES]: {
    title: 'Sorry, you don’t have any REGEN to cover transaction fees',
    description:
      'Please purchase some REGEN to cover the transaction fees for this action.',
    buttonTitle: 'LEARN MORE',
    buttonLink:
      'https://guides.regen.network/guides/regen-marketplace/currencies/basics#fees',
    icon: RegenNotFoundIcon,
  },
};

type FindErrorEnumByCodeParams = {
  errorCode?: string;
};
export const findErrorByCodeEnum = ({
  errorCode,
}: FindErrorEnumByCodeParams): ERRORS => {
  const errorKey = Object.entries(errorsMapping).find(
    ([key]) => key === errorCode,
  )?.[0];

  return errorKey ? (errorKey as ERRORS) : ERRORS.DEFAULT;
};
