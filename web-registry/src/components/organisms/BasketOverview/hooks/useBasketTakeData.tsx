import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { getDenomMetadataQuery } from 'lib/queries/react-query/cosmos/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { useWallet } from 'lib/wallet/wallet';

import { BasketTokens } from 'hooks/useBasketTokens';

export type BasketTakeData = {
  basketToken: BasketTokens;
  isLoadingTakeData: boolean;
};

export const useBasketTakeData = (): BasketTakeData => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const { basketClient, bankClient } = useLedger();
  const { wallet } = useWallet();

  const { data: basketData, isLoading: isLoadingBasket } = useQuery(
    getBasketQuery({
      enabled: !!basketClient,
      client: basketClient,
      request: { basketDenom: basketDenom },
    }),
  );

  const { data: balanceData } = useQuery(
    getBalanceQuery({
      client: bankClient,
      request: {
        address: wallet?.address,
        denom: basketData?.basketInfo?.basketDenom,
      },
    }),
  );

  const { data: denomMetadata } = useQuery(
    getDenomMetadataQuery({
      client: bankClient,
      request: { denom: basketData?.basketInfo?.basketDenom },
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
