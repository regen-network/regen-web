import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

type GetOtherSellOrderBatchDenomOptionsProps = {
  credits: BatchInfoWithBalance[];
  sellOrderCreateOpen: number;
};

export const getOtherSellOrderBatchDenomOptions = ({
  credits,
  sellOrderCreateOpen,
}: GetOtherSellOrderBatchDenomOptionsProps): {
  label: string;
  value: string;
}[] =>
  credits
    .filter(credit => credit.denom !== credits[sellOrderCreateOpen].denom)
    .map(credit => ({
      label: credit.denom,
      value: credit.denom,
    }));

type getAvailableAmountByBatchProps = {
  credits: BatchInfoWithBalance[];
};

export const getAvailableAmountByBatch = ({
  credits,
}: getAvailableAmountByBatchProps): {
  [key: string]: number;
} =>
  credits.reduce(
    (acc, credit) => ({
      ...acc,
      [credit.denom]: Number(credit.balance?.tradableAmount),
    }),
    {} as { [key: string]: number },
  );
