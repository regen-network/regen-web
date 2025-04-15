import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { BasketTokens } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { getDenomMetadataQuery } from 'lib/queries/react-query/cosmos/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { useWallet } from 'lib/wallet/wallet';

export type BasketTakeData = {
  basketToken: BasketTokens;
  isLoadingTakeData: boolean;
};

export const useBasketTakeData = (): BasketTakeData => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const { queryClient } = useLedger();
  const { wallet } = useWallet();

  const { data: basketData, isLoading: isLoadingBasket } = useQuery(
    getBasketQuery({
      enabled: !!queryClient && !!basketDenom,
      client: queryClient,
      request: { basketDenom: basketDenom as string },
    }),
  );

  const { data: balanceData } = useQuery(
    getBalanceQuery({
      enabled:
        !!queryClient &&
        !!wallet?.address &&
        !!basketData?.basketInfo?.basketDenom,
      client: queryClient,
      request: {
        address: wallet?.address as string,
        denom: basketData?.basketInfo?.basketDenom as string,
      },
    }),
  );

  const { data: denomMetadata } = useQuery(
    getDenomMetadataQuery({
      enabled: !!queryClient && !!basketData?.basketInfo?.basketDenom,
      client: queryClient,
      request: { denom: basketData?.basketInfo?.basketDenom as string },
    }),
  );

  const basketToken: BasketTokens = {
    basket: basketData?.basketInfo,
    balance: balanceData ?? void 0,
    metadata: denomMetadata ?? void 0,
  };

  return {
    basketToken,
    isLoadingTakeData: isLoadingBasket,
  };
};
