import {
  QueryClientImpl as BasketQueryClient,
  QueryBasketResponse,
  QueryBasketsResponse,
  QueryBasketBalancesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

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

// Basket

export type QueryBasketProps = {
  client: BasketQueryClient;
  basketDenom: string;
};

export const queryBasket = async ({
  client,
  basketDenom,
}: QueryBasketProps): Promise<QueryBasketResponse | Error> => {
  try {
    return await client.Basket({ basketDenom });
  } catch (err) {
    return err as Error;
  }
};

// Baskets

export type QueryBasketsProps = {
  client: BasketQueryClient;
};

export const queryBaskets = async ({
  client,
}: QueryBasketsProps): Promise<QueryBasketsResponse | Error> => {
  try {
    return await client.Baskets({});
  } catch (err) {
    return err as Error;
  }
};

// Basket Balances

export type QueryBasketBalancesProps = {
  client: BasketQueryClient;
  basketDenom: string;
};

export const queryBasketBalances = async ({
  client,
  basketDenom,
}: QueryBasketBalancesProps): Promise<QueryBasketBalancesResponse | Error> => {
  try {
    return await client.BasketBalances({ basketDenom });
  } catch (err) {
    return err as Error;
  }
};
