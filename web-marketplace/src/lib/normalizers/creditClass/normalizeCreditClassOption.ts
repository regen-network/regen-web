import { getClassImageWithGreenDefault } from 'utils/image/classImage';

import { IndexerClassesByIssuerQuery, Maybe } from 'generated/indexer-graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { CreditClassOption } from './normalizeCreditClassOptions.types';

type Params = {
  classesByIssuer?: Maybe<IndexerClassesByIssuerQuery>;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityCreditClasses?: AllCreditClassQuery;
};

export const normalizeCreditClassOptions = ({
  classesByIssuer,
  classesMetadata,
  sanityCreditClasses,
}: Params): CreditClassOption[] => {
  return (
    classesByIssuer?.allClassIssuers?.nodes.map((creditClass, index) => {
      const metadata = classesMetadata?.[index];
      const creditClassId = creditClass?.classId;
      const sanityCreditClass = sanityCreditClasses?.allCreditClass.find(
        sanityCreditClass => sanityCreditClass.path === sanityCreditClass,
      );

      const name = metadata?.['schema:name'];
      const title = name ? `${name} (${creditClassId})` : creditClassId;

      return {
        id: creditClassId ?? '',
        imageSrc: getClassImageWithGreenDefault({
          metadata,
          sanityClass: sanityCreditClass,
        }),
        onChainId: creditClassId ?? '',
        title: title ?? '',
        description: metadata?.['schema:description'],
      };
    }) ?? []
  );
};
