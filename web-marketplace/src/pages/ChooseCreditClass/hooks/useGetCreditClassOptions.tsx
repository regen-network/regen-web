import { useEffect, useState } from 'react';
import { getClassImageWithGreenDefault } from 'utils/image/classImage';

import { useAllCreditClassesQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { client } from 'lib/clients/sanity';
import { queryClassIssuers } from 'lib/ecocredit/api';
import { useWallet } from 'lib/wallet/wallet';

import useQueryListClassesWithMetadata from 'hooks/useQueryListClassesWithMetadata';

interface CreditClassOption {
  id: string;
  onChainId: string;
  imageSrc: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

function useGetCreditClassOptions(): {
  creditClassOptions: CreditClassOption[];
  loading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [creditClassOptions, setCreditClassOptions] = useState<
    CreditClassOption[]
  >([]);
  const { wallet } = useWallet();
  const onChainClasses = useQueryListClassesWithMetadata();
  const { data: offChainCreditClasses } = useAllCreditClassesQuery();
  const { data: creditClassContentData } = useAllCreditClassQuery({ client });

  useEffect(() => {
    // eslint-disable-next-line
    const setupOptions = async () => {
      if (!wallet?.address || onChainClasses?.length < 1) return;

      const offChainClasses =
        offChainCreditClasses?.allCreditClasses?.nodes?.filter(
          offChain =>
            offChain?.onChainId &&
            onChainClasses?.findIndex(
              onChain => onChain.id === offChain.onChainId,
            ) > -1,
        ) || [];

      const creditClassesContent = creditClassContentData?.allCreditClass;

      let ccOptions: CreditClassOption[] = [];
      for (const onChainClass of onChainClasses) {
        const creditClassOnChainId = onChainClass?.id;
        const contentMatch = creditClassesContent?.find(
          content => content.path === creditClassOnChainId,
        );
        const offChainMatch = offChainClasses.find(
          offChainClass => offChainClass?.onChainId === creditClassOnChainId,
        );
        const metadata = onChainClass?.metadataJson;
        const name = metadata?.['schema:name'];
        const title = name
          ? `${name} (${creditClassOnChainId})`
          : creditClassOnChainId;
        const { issuers } = await queryClassIssuers(onChainClass.id);
        if (issuers?.includes(wallet.address)) {
          ccOptions.push({
            id: offChainMatch?.id || '',
            onChainId: creditClassOnChainId || '',
            imageSrc: getClassImageWithGreenDefault({
              metadata,
              sanityClass: contentMatch,
            }),
            title: title || '',
            description: metadata?.['schema:description'],
          });
        }
      }

      setCreditClassOptions(ccOptions);
      setLoading(false);
    };

    setupOptions();
  }, [onChainClasses, creditClassContentData, offChainCreditClasses, wallet]);

  return { creditClassOptions, loading };
}

export { useGetCreditClassOptions };