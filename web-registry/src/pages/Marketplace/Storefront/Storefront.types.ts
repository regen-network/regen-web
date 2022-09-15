export type SellOrderStatus =
  | 'Not yet filled'
  | 'Partially filled'
  | 'Filled'
  | 'Expired'
  | 'Cancelled';

export type NormalizedSellOrder = {
  id: string;
  expiration?: Date;
  project?: {
    name?: string | null;
    id: string;
    classIdName?: string | null;
    classIdUrl?: string | null;
  };
  status?: SellOrderStatus;
  askAmount: string;
  askDenom: string;
  askBaseDenom: string;
  amountAvailable: string;
  amountSold?: string;
  batchDenom: string;
  batchStartDate?: Date | null;
  batchEndDate?: Date | null;
  seller: string;
  disableAutoRetire: boolean;
};

export type SellOrderActions = 'buy' | 'cancel' | 'change';
