import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';

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
    classIdOrName?: string | null;
    classId?: string | null;
  };
  status?: SellOrderStatus;
  askAmount: string;
  askUsdAmount: number;
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

export type ProjectInfoWithMetadata = Omit<ProjectInfo, 'metadata'> & {
  metadata: any;
};
