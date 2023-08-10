/* getCreditClassesMapping */

import { ReactElement } from 'react';

import { BlockContent } from 'web-components/lib/components/block-content';

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
