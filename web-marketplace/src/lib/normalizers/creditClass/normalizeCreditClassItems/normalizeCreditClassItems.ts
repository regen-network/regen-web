import { getClassImageWithGreenDefault } from 'utils/image/classImage';

import { AllCreditClassesQuery } from 'generated/graphql';
import { IndexerClassesByIssuerQuery, Maybe } from 'generated/indexer-graphql';
import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { CreditClassItem } from './normalizeCreditClassItems.types';

type Params = {
  classesByIssuer?: Maybe<IndexerClassesByIssuerQuery>;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
  sanityCreditClasses?: AllCreditClassQuery;
  offChainCreditClasses?: AllCreditClassesQuery;
};

export const normalizeCreditClassItems = ({
  classesByIssuer,
  classesMetadata,
  sanityCreditClasses,
  offChainCreditClasses,
}: Params): CreditClassItem[] => {
  return (
    classesByIssuer?.allClassIssuers?.nodes.map((creditClass, index) => {
      const metadata = classesMetadata?.[index];
      const creditClassOnChainId = creditClass?.classId;
      const sanityCreditClass = sanityCreditClasses?.allCreditClass.find(
        sanityCreditClass => sanityCreditClass.path === sanityCreditClass,
      );
      const offChainCreditClass =
        offChainCreditClasses?.allCreditClasses?.nodes.find(
          creditClass => creditClass?.onChainId === creditClassOnChainId,
        );

      const name = metadata?.['schema:name'];
      const title = name
        ? `${name} (${creditClassOnChainId})`
        : creditClassOnChainId;

      return {
        id: offChainCreditClass?.id ?? '',
        imageSrc: getClassImageWithGreenDefault({
          metadata,
          sanityClass: sanityCreditClass,
        }),
        onChainId: creditClassOnChainId ?? '',
        title: title ?? '',
        description: metadata?.['schema:description'],
      };
    }) ?? []
  );
};
