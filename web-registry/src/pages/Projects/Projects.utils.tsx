/* getCreditClassesMapping */

import { ReactElement } from 'react';

import { BlockContent } from 'web-components/lib/components/block-content';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

type GetCreditClassesMappingProps = {
  creditClassesData?: AllCreditClassQuery;
};

export const getCreditClassesMapping = ({
  creditClassesData,
}: GetCreditClassesMappingProps) => {
  const creditClassesMapping = creditClassesData?.allCreditClass.reduce(
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
