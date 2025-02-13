import { getClassImageWithGreenDefault } from 'utils/image/classImage';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import { getPurchaseInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';

import {
  CreditClassWithMedata,
  CreditClassWithOrder,
} from './normalizeCreditClassesWithOrders.types';

type Params = {
  classesWithMetadata?: CreditClassWithMedata[];
  sanityCreditClasses?: AllCreditClassQuery;
  sellOrders?: SellOrderInfoExtented[];
  userAddress?: string;
};

export const normalizeCreditClassesWithOrders = ({
  classesWithMetadata,
  sanityCreditClasses,
  sellOrders = [],
  userAddress,
}: Params): CreditClassWithOrder[] => {
  return (
    classesWithMetadata?.map((creditClassWithMetadata, index) => {
      const creditClass = creditClassWithMetadata.creditClass;
      const creditClassOnChainId = creditClass.id;
      const metadata = creditClassWithMetadata.metadata;
      const sanityCreditClass = sanityCreditClasses?.allCreditClass.find(
        sanityCreditClass => sanityCreditClass.path === creditClassOnChainId,
      );

      const name = metadata?.['schema:name'];
      const title = name ?? creditClassOnChainId;

      const sellOrdersFiltered = sellOrders.filter(sellOrder =>
        sellOrder?.batchDenom?.startsWith(creditClassOnChainId),
      );

      const purchaseInfo = getPurchaseInfo({
        sellOrders: sellOrdersFiltered,
        userAddress,
      });

      return {
        id: creditClassOnChainId,
        name: title,
        imgSrc: getClassImageWithGreenDefault({
          metadata: metadata as CreditClassMetadataLD,
          sanityClass: sanityCreditClass,
        }),
        purchaseInfo,
      };
    }) ?? []
  );
};
