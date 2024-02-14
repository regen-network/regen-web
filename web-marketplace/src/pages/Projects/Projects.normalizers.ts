import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { SKIPPED_CLASS_ID } from 'lib/env';

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
    creditClassesWithMetadata
      ?.filter(({ creditClass }) => creditClass.id !== SKIPPED_CLASS_ID)
      ?.map(({ creditClass, metadata }) => {
        const isCommunity = !sanityCreditClassIds?.includes(creditClass.id);

        return {
          name: metadata?.['schema:name'] ?? creditClass.id,
          path: creditClass.id,
          isCommunity,
        };
      }) ?? [];

  return { creditClassFilters };
};
