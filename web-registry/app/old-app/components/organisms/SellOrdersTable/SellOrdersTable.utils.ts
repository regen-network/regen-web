import { SellOrderStatus } from '../../../pages/Marketplace/Storefront/Storefront.types';

type getSellOrderColorProps = {
  sellOrderStatus?: SellOrderStatus;
};

export const getSellOrderColor = ({
  sellOrderStatus,
}: getSellOrderColorProps): string => {
  switch (sellOrderStatus) {
    case 'Not yet filled':
      return 'warning.light';
    case 'Partially filled':
      return 'secondary.light';
    case 'Filled':
      return 'secondary.contrastText';
    case 'Expired':
      return 'orange.contrastText';
    case 'Cancelled':
      return 'error.light';
    default:
      return 'warning.light';
  }
};
