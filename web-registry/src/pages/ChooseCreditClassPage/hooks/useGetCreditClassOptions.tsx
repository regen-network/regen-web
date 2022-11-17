import { useEffect, useState } from 'react';

import { useAllCreditClassesQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { queryClassIssuers } from 'lib/ecocredit/api';
import { useWallet } from 'lib/wallet/wallet';
import { client } from 'sanity';

import useQueryListClassesWithMetadata from 'hooks/useQueryListClassesWithMetadata';

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

      const ccOptions = await Promise.all(
        onChainClasses?.map(async onChainClass => {
          const creditClassOnChainId = onChainClass?.id;
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
          const { issuers } = await queryClassIssuers(onChainClass.id);
          const isIssuer = issuers?.includes(wallet.address);

          return {
            id: offChainMatch?.id || '',
            onChainId: creditClassOnChainId || '',
            imageSrc: contentMatch?.image?.image?.asset?.url || '',
            title: title || '',
            description: metadata?.['schema:description'],
            disabled: !isIssuer,
          };
        }) || [],
      );

      setCreditClassOptions(ccOptions);
      setLoading(false);
    };

    setupOptions();
  }, [onChainClasses, creditClassContentData, offChainCreditClasses, wallet]);

  return { creditClassOptions, loading };
}

export { useGetCreditClassOptions };
