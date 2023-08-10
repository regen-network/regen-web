import {
  DeepPartial,
  QueryAllowedDenomsRequest,
  QueryAllowedDenomsResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

// typing the query client

export type MarketplaceQueryClient = QueryClientImpl;

export interface MarketplaceQueryClientProps {
  client: MarketplaceQueryClient;
}

// typing and linking query names and corresponding input params

type AllowedDenomParams = {
  query: 'allowedDenoms';
  params: DeepPartial<QueryAllowedDenomsRequest>;
};

// typing the request

export type MarketplaceQueryParams = AllowedDenomParams;

// typing the response

export type MarketplaceQueryResponse = QueryAllowedDenomsResponse;
