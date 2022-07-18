export type SellOrderStatus =
  | 'Not yet filled'
  | 'Partially filled'
  | 'Filled'
  | 'Expired'
  | 'Cancelled';

export type NormalizedSellOrder = {
  id: string;
  expiration?: Date;
  project?: string;
  status?: SellOrderStatus;
  askAmount: string;
  askDenom: string;
  amountAvailable: string;
  amountSold?: string;
  creditClass?: string | null;
  batchDenom: string;
  batchStartDate?: Date | null;
  batchEndDate?: Date | null;
  seller: string;
};

export type SellOrderActions = 'buy' | 'cancel' | 'change';
