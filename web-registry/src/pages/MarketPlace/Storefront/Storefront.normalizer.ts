import { QueryBatchInfoResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { NormalizedSellOrder, SellOrder } from './Storefront.types';

type Props = {
  sellOrders: SellOrder[];
  batchInfos: QueryBatchInfoResponse[];
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
      creditClass: batchInfos[index]?.info?.classId,
      batchDenom: batch_denom,
      batchStartDate: batchInfos[index]?.info?.startDate,
      batchEndDate: batchInfos[index]?.info?.endDate,
      seller,
    }),
  );

export default normalizeSellOrders;
