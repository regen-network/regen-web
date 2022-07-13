import { QueryBatchResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { NormalizedSellOrder, SellOrder } from './Storefront.types';

type Props = {
  sellOrders: SellOrder[];
  batchInfos?: QueryBatchResponse[];
};

const normalizeSellOrders = ({
  batchInfos,
  sellOrders,
}: Props): NormalizedSellOrder[] =>
  sellOrders.map(
    (
      { ask_amount, ask_denom, batch_denom, id, quantity, seller, expiration },
      index,
    ) => ({
      id,
      expiration,
      project: undefined,
      status: 'Partially filled',
      askAmount: ask_amount,
      askDenom: ask_denom,
      amountAvailable: quantity,
      amountSold: undefined,
      creditClass: batchInfos ? batchInfos[index]?.batch?.denom : null,
      batchDenom: batch_denom,
      batchStartDate: batchInfos ? batchInfos[index]?.batch?.startDate : null,
      batchEndDate: batchInfos ? batchInfos[index]?.batch?.endDate : null,
      seller,
    }),
  );

export default normalizeSellOrders;
