export type SellOrder = {
  id: string;
  seller: string;
  batch_denom: string;
  quantity: string;
  ask_denom: string;
  ask_amount: string;
  disable_auto_retire: boolean;
  expiration?: string;
};

export type SellOrderStatus =
  | 'Not yet filled'
  | 'Partially filled'
  | 'Filled'
  | 'Expired'
  | 'Cancelled';

export type NormalizedSellOrder = {
  id: string;
  expiration?: string;
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
