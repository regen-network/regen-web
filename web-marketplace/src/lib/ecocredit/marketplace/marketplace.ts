import {
  DeepPartial,
  QueryAllowedDenomsRequest,
  QueryAllowedDenomsResponse,
  QuerySellOrdersRequest,
  QuerySellOrdersResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { MarketplaceQueryClientProps } from './marketplace.types';

// AllowedDenoms

export interface QueryAllowedDenomsProps extends MarketplaceQueryClientProps {
  request: DeepPartial<QueryAllowedDenomsRequest>;
}

export const queryAllowedDenoms = async ({
  client,
  request,
}: QueryAllowedDenomsProps): Promise<QueryAllowedDenomsResponse> => {
  try {
    return await client.AllowedDenoms(request);
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line lingui/no-unlocalized-strings
      `Error in the AllowedDenoms query of the ledger ecocredit/marketplace module: ${err}`,
    );
  }
};

// SellOrders

export interface QuerySellOrdersProps extends MarketplaceQueryClientProps {
  request: DeepPartial<QuerySellOrdersRequest>;
}

export const querySellOrders = async ({
  client,
  request,
}: QuerySellOrdersProps): Promise<QuerySellOrdersResponse> => {
  try {
    return await client.SellOrders(request);
  } catch (err) {
    throw new Error(
      // eslint-disable-next-line lingui/no-unlocalized-strings
      `Error in the SellOrders query of the ledger ecocredit/marketplace module: ${err}`,
    );
  }
};
