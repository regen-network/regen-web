import {
  QueryClientImpl,
  DeepPartial,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
  QueryBalanceResponse,
  QueryBalanceRequest,
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

export type BankQueryClient = QueryClientImpl;

export type BankQueryParams = any; // TODO: generic type

export type BankQueryDTO = QueryDenomMetadataResponse | QueryBalanceResponse;

export type BankQueryName =
  | 'allBalances'
  | 'balance'
  | 'denomMetadata'
  | 'denomsMetadata';

//

interface BankQueryClientProps {
  client: BankQueryClient;
}

// Balance

interface QueryBalanceProps extends BankQueryClientProps {
  request: DeepPartial<QueryBalanceRequest>;
}

export const queryBalance = ({
  client,
  request,
}: QueryBalanceProps): Promise<QueryBalanceResponse> => {
  return client.Balance({ address: request.address, denom: request.denom });
};

// Denom Metadata

interface QueryDenomMetadataProps extends BankQueryClientProps {
  request: DeepPartial<QueryDenomMetadataRequest>;
}

export const queryDenomMetadata = ({
  client,
  request,
}: QueryDenomMetadataProps): Promise<QueryDenomMetadataResponse> => {
  return client.DenomMetadata({ denom: request.denom });
};
