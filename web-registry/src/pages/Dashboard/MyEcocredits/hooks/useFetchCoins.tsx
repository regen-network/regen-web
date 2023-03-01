import { useQuery } from '@tanstack/react-query';
import { uniq } from 'lodash';

import { useLedger } from 'ledger';
import { getAllBalancesQuery } from 'lib/queries/react-query/cosmos/bank/getAllBalancesQuery/getAllBalancesQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getDenomTraceByHashesQuery } from 'lib/queries/react-query/ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { IBC_DENOM_PREFIX } from 'hooks/useQuerySellOrders';

export type CoinBalance = {
  name: string;
  denom: string;
  amount: string;
};

export const useFetchCoins = (): CoinBalance[] => {
  const { marketplaceClient, bankClient } = useLedger();
  const { wallet } = useWallet();
  const accountAddress = wallet?.address;
  const { data: userBalances } = useQuery(
    getAllBalancesQuery({
      client: bankClient,
      request: { address: accountAddress },
      enabled: !!bankClient,
    }),
  );
  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: marketplaceClient,
      enabled: !!marketplaceClient,
    }),
  );
  const allowedBankDenoms =
    allowedDenomsData?.allowedDenoms?.map(
      allowedDenom => allowedDenom.bankDenom,
    ) ?? [];

  const allowedCoins =
    userBalances?.balances.filter(balance =>
      allowedBankDenoms.includes(balance?.denom),
    ) ?? [];

  // Find sell orders that have ibc askDenom and gather their hash
  const ibcDenomHashes = uniq(
    allowedCoins
      .filter(allowedCoin => allowedCoin.denom.includes(IBC_DENOM_PREFIX))
      .map(allowedCoin => allowedCoin.denom.replace(IBC_DENOM_PREFIX, '')),
  );

  // Call DenomsTrace on each ibc denom hash;
  const { data: denomTraces } = useQuery(
    getDenomTraceByHashesQuery({
      hashes: ibcDenomHashes,
    }),
  );

  const coins = allowedCoins.map(coin => {
    const denomTrace = denomTraces?.find(denomTrace =>
      coin.denom.includes(denomTrace.hash),
    );
    const baseDenom = denomTrace ? denomTrace.baseDenom : coin.denom;
    const allowedDenom = allowedDenomsData?.allowedDenoms.find(
      denom => coin.denom === denom.bankDenom,
    );

    return {
      name: allowedDenom?.displayDenom ?? baseDenom,
      denom: baseDenom,
      amount: coin.amount,
    };
  });

  return coins;
};
