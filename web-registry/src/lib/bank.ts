import {
  QueryClientImpl,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
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

/**
 *
 * QUERY TYPES
 *
 */

// typing the query client

export type BankQueryClient = QueryClientImpl;

interface BankQueryClientProps {
  client: BankQueryClient;
}

// typing and linking query names and corresponding input params

type BalanceParams = {
  queryName: 'balance';
  params: DeepPartial<QueryBalanceRequest>;
};

type DenomMetadataParams = {
  queryName: 'denomMetadata';
  params: DeepPartial<QueryDenomMetadataRequest>;
};

export type BankQueryProps = BalanceParams | DenomMetadataParams;

// typing the data received (Data Transfer Object), the output of the query

export type BankQueryDTO = QueryDenomMetadataResponse | QueryBalanceResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

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
