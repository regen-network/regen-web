/* getCreditClassesMapping */

import { ReactElement } from 'react';

import { BlockContent } from 'web-components/src/components/block-content';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { SKIPPED_CLASS_ID } from 'lib/env';

type GetCreditClassesMappingProps = {
  creditClassesData?: AllCreditClassQuery;
};

export const getCreditClassesMapping = ({
  creditClassesData,
}: GetCreditClassesMappingProps) => {
  const creditClassesFiltered = creditClassesData?.allCreditClass?.filter(
    creditClass => creditClass.path !== SKIPPED_CLASS_ID,
  );

  const creditClassesMapping = creditClassesFiltered?.reduce(
    (acc, creditClass) => {
      acc[creditClass.path ?? ''] = (
        <BlockContent content={creditClass.nameRaw} />
      );

      return acc;
    },
    {} as Record<string, string | JSX.Element | ReactElement[]>,
  );

  return creditClassesMapping;
};

export const getFilterSelected = (checked: boolean) =>
  checked ? 'selected' : 'unselected';

export const getCreditClassFilters = (
  creditClassFilters: Record<string, boolean>,
  value: boolean,
) =>
  Object.keys(creditClassFilters).reduce((accumulator, key) => {
    return { ...accumulator, [key]: value };
  }, {});
