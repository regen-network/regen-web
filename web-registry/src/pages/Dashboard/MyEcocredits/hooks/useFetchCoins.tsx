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
  bankDenom: string;
  baseDenom: string;
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

  // Find sell orders that have ibc askDenom and gather their hash
  const ibcDenomHashes = uniq(
    allowedBankDenoms
      .filter(denom => denom.includes(IBC_DENOM_PREFIX))
      .map(denom => denom.replace(IBC_DENOM_PREFIX, '')),
  );

  // Call DenomsTrace on each ibc denom hash;
  const { data: denomTraces } = useQuery(
    getDenomTraceByHashesQuery({
      hashes: ibcDenomHashes,
    }),
  );

  const coins =
    allowedDenomsData?.allowedDenoms.map(allowedDenom => {
      const coin = userBalances?.balances.find(
        coin => coin.denom === allowedDenom.bankDenom,
      );
      const denomTrace = denomTraces?.find(denomTrace =>
        coin?.denom.includes(denomTrace.hash),
      );
      const baseDenom = denomTrace
        ? denomTrace.baseDenom
        : allowedDenom.bankDenom;

      return {
        name: allowedDenom?.displayDenom ?? baseDenom,
        bankDenom: allowedDenom.bankDenom,
        baseDenom: baseDenom,
        amount: coin?.amount ?? '0',
      };
    }) ?? [];

  return coins;
};
