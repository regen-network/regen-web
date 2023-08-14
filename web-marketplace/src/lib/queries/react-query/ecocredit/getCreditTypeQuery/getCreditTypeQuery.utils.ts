import { CREDIT_TYPE_KEY } from './getCreditTypeQuery.constants';

type GetBalanceQueryKeyParams = {
  abbreviation?: string;
};

export const getCreditTypeQueryKey = ({
  abbreviation,
}: GetBalanceQueryKeyParams): string[] => [CREDIT_TYPE_KEY, abbreviation ?? ''];
