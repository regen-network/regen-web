import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { QueryBatchResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { NormalizedSellOrder } from './Storefront.types';

type Props = {
  sellOrders?: SellOrderInfo[];
  batchInfos?: QueryBatchResponse[];
};

const normalizeSellOrders = ({
  batchInfos,
  sellOrders,
}: Props): NormalizedSellOrder[] =>
  sellOrders?.map(
    (
      { askAmount, askDenom, batchDenom, id, quantity, seller, expiration },
      index,
    ) => ({
      id: String(id),
      expiration,
      project: undefined,
      status: 'Partially filled',
      askAmount: askAmount,
      askDenom: batchDenom,
      amountAvailable: quantity,
      amountSold: undefined,
      creditClass: '',
      batchDenom: batchDenom,
      batchStartDate: batchInfos
        ? batchInfos[index]?.batch?.startDate
        : undefined,
      batchEndDate: batchInfos ? batchInfos[index]?.batch?.endDate : undefined,
      seller,
    }),
  ) ?? [];

export default normalizeSellOrders;
