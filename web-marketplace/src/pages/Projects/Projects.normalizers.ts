import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { CreditClassWithMedata } from './hooks/useFetchCreditClasses';

type NormalizeCreditClassesFilterParams = {
  sanityCreditClassesData?: AllCreditClassQuery;
  creditClassesWithMetadata?: CreditClassWithMedata[];
};

type NormalizeCreditClassFiltersResponse = {
  creditClassFilters: CreditClassFilter[];
};

export type CreditClassFilter = {
  name: string;
  path: string;
  isCommunity: boolean;
};

export const normalizeCreditClassFilters = ({
  creditClassesWithMetadata,
  sanityCreditClassesData,
}: NormalizeCreditClassesFilterParams): NormalizeCreditClassFiltersResponse => {
  const sanityCreditClassIds = sanityCreditClassesData?.allCreditClass.map(
    sanityCreditClass => sanityCreditClass.path,
  );

  const creditClassFilters =
    creditClassesWithMetadata?.map(({ creditClass, metadata }) => {
      const isCommunity = !sanityCreditClassIds?.includes(creditClass.id);

      return {
        name: metadata?.['schema:name'] ?? creditClass.id,
        path: creditClass.id,
        isCommunity,
      };
    }) ?? [];

  return { creditClassFilters };
};
