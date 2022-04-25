import {
  QueryClientImpl,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

// TODO: pagination not implemented yet

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

// TODO ?
// typing the response
// export type BankQueryResponse = QueryDenomMetadataResponse | QueryBalanceResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

// Balance

interface QueryBalanceProps extends BankQueryClientProps {
  request: DeepPartial<QueryBalanceRequest>;
}

export const queryBalance = async ({
  client,
  request,
}: QueryBalanceProps): Promise<DeepPartial<QueryBalanceResponse>> => {
  try {
    return await client.Balance({
      address: request.address,
      denom: request.denom,
    });
  } catch (err) {
    throw new Error('Error in the Balance query of the ledger bank module.');
  }
};

// Denom Metadata

interface QueryDenomMetadataProps extends BankQueryClientProps {
  request: DeepPartial<QueryDenomMetadataRequest>;
}

export const queryDenomMetadata = async ({
  client,
  request,
}: QueryDenomMetadataProps): Promise<
  DeepPartial<QueryDenomMetadataResponse>
> => {
  try {
    return await client.DenomMetadata({ denom: request.denom });
  } catch (err) {
    throw new Error(
      'Error in the DenomMetadata query of the ledger bank module.',
    );
  }
};
