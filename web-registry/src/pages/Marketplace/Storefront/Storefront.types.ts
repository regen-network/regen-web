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
  project?: { name?: string; handle: string };
  status?: SellOrderStatus;
  askAmount: string;
  askDenom: string;
  amountAvailable: string;
  amountSold?: string;
  creditClass?: string;
  batchDenom: string;
  batchStartDate?: Date;
  batchEndDate?: Date;
  seller: string;
};
