import { FilterOption } from 'web-components/src/components/organisms/ProjectFilters/ProjectFilters';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { SKIPPED_CLASS_ID } from 'lib/env';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { CreditClassWithMedata } from '../hooks/useFetchCreditClasses';
import {
  CREDIT_CARD_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_ID,
} from '../Projects.constants';
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
  buyingOptionsFilters: Record<string, boolean>;
  allProjects: ProjectWithOrderData[];
};

type NormalizeCreditClassFiltersResponse = {
  creditClassFilters: CreditClassFilter[];
};

export const normalizeCreditClassFilters = ({
  allOnChainProjects,
  allProjects,
  creditClassesWithMetadata,
  sanityCreditClassesData,
  haveOffChainProjects,
  buyingOptionsFilters,
  _,
}: NormalizeCreditClassesFilterParams): NormalizeCreditClassFiltersResponse => {
  const sanityCreditClassIds = sanityCreditClassesData?.allCreditClass.map(
    sanityCreditClass => sanityCreditClass.path,
  );

  const creditClassesIdsWithProjects = [
    ...new Set(allOnChainProjects.map(project => project.creditClassId)),
  ];

  const creditClassFilters: CreditClassFilter[] =
    creditClassesWithMetadata
      ?.filter(({ creditClass }) => {
        const projectsFromCreditClass = allProjects.filter(
          project => project.creditClassId === creditClass.id,
        );

        return (
          creditClass.id !== SKIPPED_CLASS_ID &&
          creditClassesIdsWithProjects.includes(creditClass.id) &&
          (buyingOptionsFilters[CREDIT_CARD_BUYING_OPTION_ID]
            ? projectsFromCreditClass.some(
                project =>
                  project.allCardSellOrders &&
                  project.allCardSellOrders.length > 0,
              )
            : true)
        );
      })
      ?.map(({ creditClass, metadata }) => {
        const isCommunity = !sanityCreditClassIds?.includes(creditClass.id);

        return {
          name: metadata?.['schema:name'] ?? creditClass.id,
          path: creditClass.id,
          isCommunity,
        };
      }) ?? [];

  if (!buyingOptionsFilters[CRYPTO_BUYING_OPTION_ID] && haveOffChainProjects)
    creditClassFilters.push({
      name: _(UNREGISTERED_PROJECTS),
      path: UNREGISTERED_PATH,
    });

  return { creditClassFilters };
};
