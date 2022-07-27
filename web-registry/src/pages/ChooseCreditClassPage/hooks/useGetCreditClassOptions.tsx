import { useEffect, useState } from 'react';

import { useAllCreditClassesQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { useWallet } from 'lib/wallet';
import { client } from 'sanity';

import { useQueryListClassesWithMetadata } from 'hooks';

interface CreditClassOption {
  id: string;
  onChainId: string;
  imageSrc?: string;
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
    if (!wallet?.address || onChainClasses?.length < 1) {
      return;
    }

    const offChainClasses =
      offChainCreditClasses?.allCreditClasses?.nodes?.filter(
        offChain =>
          offChain?.onChainId &&
          onChainClasses?.findIndex(
            onChain => onChain.classId === offChain.onChainId,
          ) > -1,
      ) || [];

    const creditClassesContent = creditClassContentData?.allCreditClass;
    const ccOptions =
      onChainClasses?.map(onChainClass => {
        const creditClassOnChainId = onChainClass?.classId;
        const contentMatch = creditClassesContent?.find(
          content => content.path === creditClassOnChainId,
        );
        const offChainMatch = offChainClasses.find(
          offChainClass => offChainClass?.onChainId === creditClassOnChainId,
        );
        const metadata = onChainClass?.metadataJson || {};
        const name = metadata?.['schema:name'];
        const title = name
          ? `${name} (${creditClassOnChainId})`
          : creditClassOnChainId;

        return {
          id: offChainMatch?.id || '',
          onChainId: creditClassOnChainId || '',
          imageSrc: contentMatch?.image?.image?.asset?.url || '',
          title: title || '',
          description: metadata?.['schema:description'],
          disabled: !onChainClass.issuers.includes(wallet.address),
        };
      }) || [];

    setCreditClassOptions(ccOptions);
    setLoading(false);
  }, [onChainClasses, creditClassContentData, offChainCreditClasses, wallet]);

  return { creditClassOptions, loading };
}

export { useGetCreditClassOptions };
