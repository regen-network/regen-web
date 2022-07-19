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
  amountAvailable: string;
  amountSold?: string;
  batchDenom: string;
  batchStartDate?: Date | null;
  batchEndDate?: Date | null;
  seller: string;
};
