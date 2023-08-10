import {
  DeepPartial,
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryClientImpl,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
  QueryDenomsMetadataRequest,
  QueryDenomsMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

// TODO: pagination not implemented yet

/**
 *
 * BANK MODULE QUERIES
 * -------------------
 *  - AllBalances
 *  - Balance
 *  - DenomMetadata
 *  - DenomsMetadata
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

type AllBalancesParams = {
  query: 'allBalances';
  params: DeepPartial<QueryAllBalancesRequest>;
};

type BalanceParams = {
  query: 'balance';
  params: DeepPartial<QueryBalanceRequest>;
};

type DenomMetadataParams = {
  query: 'denomMetadata';
  params: DeepPartial<QueryDenomMetadataRequest>;
};

type DenomsMetadataParams = {
  query: 'denomsMetadata';
  params: DeepPartial<QueryDenomsMetadataRequest>;
};

export type BankQueryProps =
  | AllBalancesParams
  | BalanceParams
  | DenomMetadataParams
  | DenomsMetadataParams;

// typing the response

export type BankQueryResponse =
  | QueryAllBalancesResponse
  | QueryBalanceResponse
  | QueryDenomMetadataResponse
  | QueryDenomsMetadataResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

// All Balances

interface QueryAllBalancesProps extends BankQueryClientProps {
  request: DeepPartial<QueryAllBalancesRequest>;
}

export const queryAllBalances = async ({
  client,
  request,
}: QueryAllBalancesProps): Promise<QueryAllBalancesResponse> => {
  try {
    return await client.AllBalances({
      address: request.address,
    });
  } catch (err) {
    throw new Error(
      `Error in the AllBalances query of the ledger bank module: ${err}`,
    );
  }
};

// Balance

interface QueryBalanceProps extends BankQueryClientProps {
  request: DeepPartial<QueryBalanceRequest>;
}

export const queryBalance = async ({
  client,
  request,
}: QueryBalanceProps): Promise<QueryBalanceResponse> => {
  try {
    return await client.Balance({
      address: request.address,
      denom: request.denom,
    });
  } catch (err) {
    throw new Error(
      `Error in the Balance query of the ledger bank module: ${err}`,
    );
  }
};

// Denom Metadata

interface QueryDenomMetadataProps extends BankQueryClientProps {
  request: DeepPartial<QueryDenomMetadataRequest>;
}

export const queryDenomMetadata = async ({
  client,
  request,
}: QueryDenomMetadataProps): Promise<QueryDenomMetadataResponse> => {
  try {
    return await client.DenomMetadata({ denom: request.denom });
  } catch (err) {
    throw new Error(
      `Error in the DenomMetadata query of the ledger bank module: ${err}`,
    );
  }
};

// Denoms Metadata

interface QueryDenomsMetadataProps extends BankQueryClientProps {
  request: DeepPartial<QueryDenomsMetadataRequest>;
}

export const queryDenomsMetadata = async ({
  client,
  request,
}: QueryDenomsMetadataProps): Promise<QueryDenomsMetadataResponse> => {
  try {
    return await client.DenomsMetadata({});
  } catch (err) {
    throw new Error(
      `Error in the DenomsMetadata query of the ledger bank module: ${err}`,
    );
  }
};
