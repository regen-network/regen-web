import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

type Props = {
  projectId: string;
};

type ResponseType = {
  isSellFlowDisabled: boolean;
  credits: BatchInfoWithBalance[];
};

/**
 * Prepares data for creating sell orders by filtering tradable credits from a given project.
 *
 * @param props See {@link Props}
 * @returns Object containing:
 *   - `isSellFlowDisabled`: Whether the sell flow should be disabled
 *   - `credits`: Array of credits that are tradable for the specified project
 *
 * See {@link ResponseType}
 *
 * @example
 * const { isSellFlowDisabled, credits } = useCreateSellOrderData({ projectId: 'C01' });
 */
export const useCreateSellOrderData = ({ projectId }: Props): ResponseType => {
  const { credits, isLoadingCredits } = useFetchEcocredits({});

  const creditsForProject = credits?.filter(
    credit => credit.projectId === projectId,
  );

  const tradableCredits = creditsForProject.filter(
    credit => Number(credit.balance?.tradableAmount) > 0,
  );

  const hasTradeableCredits = tradableCredits.length > 0;

  const isSellFlowDisabled = isLoadingCredits || !hasTradeableCredits;

  return {
    isSellFlowDisabled,
    credits: tradableCredits,
  };
};
