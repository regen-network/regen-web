import { BatchInfoWithBalance } from '../../types/ledger/ecocredit';

type GetOtherSellOrderBatchDenomOptionsProps = {
  credits: BatchInfoWithBalance[];
  sellOrderCreateOpen: number;
};

export const getOtherSellOrderBatchDenomOptions = ({
  credits,
  sellOrderCreateOpen,
}: GetOtherSellOrderBatchDenomOptionsProps) =>
  credits
    .filter(
      credit => credit.batch_denom !== credits[sellOrderCreateOpen].batch_denom,
    )
    .map(credit => ({
      label: credit.batch_denom,
      value: credit.batch_denom,
    }));

type getAvailableAmountByBatchProps = {
  credits: BatchInfoWithBalance[];
};

export const getAvailableAmountByBatch = ({
  credits,
}: getAvailableAmountByBatchProps) =>
  credits.reduce(
    (acc, credit) => ({
      ...acc,
      [credit.batch_denom]: Number(credit.tradable_amount),
    }),
    {} as { [key: string]: number },
  );
