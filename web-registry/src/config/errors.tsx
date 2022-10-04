import { BrokenLinkIcon } from 'web-components/lib/components/icons/BrokenLinkIcon';
import SellOrderNotFoundIcon from 'web-components/lib/components/icons/SellOrderNotFoundIcon';

export enum ERRORS {
  DEFAULT,
  SELL_ORDER_PURCHASED,
}

export const errorsMapping: Record<
  ERRORS,
  { code: string; label: string; icon: (props: any) => JSX.Element }
> = {
  [ERRORS.DEFAULT]: {
    code: 'default',
    label: 'Sorry, something went wrong!',
    icon: BrokenLinkIcon,
  },
  [ERRORS.SELL_ORDER_PURCHASED]: {
    code: 'sell_order_purchased',
    label: 'Sorry, someone has purchased this sell order!',
    icon: SellOrderNotFoundIcon,
  },
};

type FindErrorEnumByCodeParams = {
  errorCode?: string;
};
export const findErrorByCodeEnum = ({
  errorCode,
}: FindErrorEnumByCodeParams): ERRORS => {
  const errorKey = Object.entries(errorsMapping).find(
    ([key, value]) => value.code === errorCode,
  )?.[0];

  return errorKey ? (Number(errorKey) as ERRORS) : ERRORS.DEFAULT;
};
