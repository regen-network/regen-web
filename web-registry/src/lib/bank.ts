import {
  QueryClientImpl as BankQueryClient,
  QueryDenomMetadataResponse,
  QueryBalanceResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

/**
 *
 * BANK MODULE QUERIES
 * -------------------
 *  - AllBalances (TODO)
 *  - Balance
 *  - DenomMetadata
 *  - DenomsMetadata (TODO)
 *
 */

// Balance

export type QueryBalanceProps = {
  client: BankQueryClient;
  address: string;
  denom: string;
};

export const queryBalance = async ({
  client,
  address,
  denom,
}: QueryBalanceProps): Promise<QueryBalanceResponse | Error> => {
  try {
    const balance = await client.Balance({ address, denom });
    return balance;
  } catch (err) {
    return err as Error;
  }
};

// Denom Metadata

export type QueryDenomMetadataProps = {
  client: BankQueryClient;
  denom: string;
};

export const queryDenomMetadata = async ({
  client,
  denom,
}: QueryDenomMetadataProps): Promise<QueryDenomMetadataResponse | Error> => {
  try {
    const metadata = await client.DenomMetadata({ denom });
    return metadata;
  } catch (err) {
    return err as Error;
  }
};
