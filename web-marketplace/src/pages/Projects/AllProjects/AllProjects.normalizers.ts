import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { SKIPPED_CLASS_ID } from 'lib/env';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { CreditClassWithMedata } from '../hooks/useFetchCreditClasses';
import {
  UNREGISTERED_PATH,
  UNREGISTERED_PROJECTS,
} from './AllProjects.constants';
import { CreditClassFilter, ProjectWithOrderData } from './AllProjects.types';

type NormalizeCreditClassesFilterParams = {
  allOnChainProjects: ProjectWithOrderData[];
  sanityCreditClassesData?: AllCreditClassQuery;
  creditClassesWithMetadata?: CreditClassWithMedata[];
  haveOffChainProjects: boolean;
  _: TranslatorType;
};

type NormalizeCreditClassFiltersResponse = {
  creditClassFilters: CreditClassFilter[];
};

export const normalizeCreditClassFilters = ({
  allOnChainProjects,
  creditClassesWithMetadata,
  sanityCreditClassesData,
  haveOffChainProjects,
  _,
}: NormalizeCreditClassesFilterParams): NormalizeCreditClassFiltersResponse => {
  console.log('normalizeCreditClassFilters');
  const sanityCreditClassIds = sanityCreditClassesData?.allCreditClass.map(
    sanityCreditClass => sanityCreditClass.path,
  );

  const creditClassesIdsWithProjects = [
    ...new Set(allOnChainProjects.map(project => project.creditClassId)),
  ];

  const creditClassFilters: CreditClassFilter[] =
    creditClassesWithMetadata
      ?.filter(
        ({ creditClass }) =>
          creditClass.id !== SKIPPED_CLASS_ID &&
          creditClassesIdsWithProjects.includes(creditClass.id),
        true,
      )
      ?.map(({ creditClass, metadata }) => {
        const isCommunity = !sanityCreditClassIds?.includes(creditClass.id);

        return {
          name: metadata?.['schema:name'] ?? creditClass.id,
          path: creditClass.id,
          isCommunity,
        };
      }) ?? [];

  if (haveOffChainProjects)
    creditClassFilters.push({
      name: _(UNREGISTERED_PROJECTS),
      path: UNREGISTERED_PATH,
    });

  return { creditClassFilters };
};
