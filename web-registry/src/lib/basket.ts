import {
  QueryClientImpl,
  DeepPartial,
  QueryBasketRequest,
  QueryBasketResponse,
  QueryBasketsRequest,
  QueryBasketsResponse,
  QueryBasketBalancesRequest,
  QueryBasketBalancesResponse,
  QueryBasketBalanceResponse,
  QueryBasketBalanceRequest,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

// TODO: pagination not implemented yet

/**
 *
 * BASKET MODULE QUERIES
 * ---------------------
 *  - Basket
 *  - Baskets
 *  - BasketBalances
 *  - BasketBalance (TODO)
 *
 */

/**
 *
 * QUERY TYPES
 *
 */

// typing the query client

export type BasketQueryClient = QueryClientImpl;

interface BasketQueryClientProps {
  client: BasketQueryClient;
}

// typing and linking query names and corresponding input params

type BasketParams = {
  query: 'basket';
  params: DeepPartial<QueryBasketRequest>;
};

type BasketsParams = {
  query: 'baskets';
  params: DeepPartial<QueryBasketsRequest>;
};

type BasketBalancesParams = {
  query: 'basketBalances';
  params: DeepPartial<QueryBasketBalancesRequest>;
};

type BasketBalanceParams = {
  query: 'basketBalance';
  params: DeepPartial<QueryBasketBalanceRequest>;
};

export type BasketQueryProps =
  | BasketParams
  | BasketsParams
  | BasketBalancesParams
  | BasketBalanceParams;

// TODO ?
// typing the response
// export type BasketQueryResponse =
//   | QueryBasketResponse
//   | QueryBasketsResponse
//   | QueryBasketBalancesResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

// Basket

interface QueryBasketProps extends BasketQueryClientProps {
  request: DeepPartial<QueryBasketRequest>;
}

export const queryBasket = async ({
  client,
  request,
}: QueryBasketProps): Promise<DeepPartial<QueryBasketResponse>> => {
  try {
    return await client.Basket({ basketDenom: request.basketDenom });
  } catch (err) {
    throw new Error(
      `Error in the Basket query of the ledger basket module: ${err}`,
    );
  }
};

// Baskets

interface QueryBasketsProps extends BasketQueryClientProps {
  request: DeepPartial<QueryBasketsRequest>;
}

export const queryBaskets = async ({
  client,
  request,
}: QueryBasketsProps): Promise<DeepPartial<QueryBasketsResponse>> => {
  try {
    return await client.Baskets({});
  } catch (err) {
    throw new Error(
      `Error in the Baskets query of the ledger basket module: ${err}`,
    );
  }
};

// Basket Balances

interface QueryBasketBalancesProps extends BasketQueryClientProps {
  request: DeepPartial<QueryBasketBalancesRequest>;
}

export const queryBasketBalances = async ({
  client,
  request,
}: QueryBasketBalancesProps): Promise<
  DeepPartial<QueryBasketBalancesResponse>
> => {
  try {
    return await client.BasketBalances({ basketDenom: request.basketDenom });
  } catch (err) {
    throw new Error(
      `Error in the BasketBalances query of the ledger basket module: ${err}`,
    );
  }
};

// Basket Balance

interface QueryBasketBalanceProps extends BasketQueryClientProps {
  request: DeepPartial<QueryBasketBalanceRequest>;
}

export const queryBasketBalance = async ({
  client,
  request,
}: QueryBasketBalanceProps): Promise<
  DeepPartial<QueryBasketBalanceResponse>
> => {
  try {
    return await client.BasketBalance({
      basketDenom: request.basketDenom,
      batchDenom: request.batchDenom,
    });
  } catch (err) {
    throw new Error(
      `Error in the BasketBalance query of the ledger basket module: ${err}`,
    );
  }
};
