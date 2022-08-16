import { useState } from 'react';

import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';

import { ProjectByOnChainIdQuery } from '../../../../generated/graphql';
import { buildIssuanceModalData } from '../../../../lib/transform';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useIssuanceModal(
  data: ProjectByOnChainIdQuery | undefined,
) {
  const [issuanceModalData, setIssuanceModalData] =
    useState<IssuanceModalData | null>(null);
  const [issuanceModalOpen, setIssuanceModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(data, creditVintage);
        setIssuanceModalData(issuanceData);
      }
      setIssuanceModalOpen(true);
    }
  };
  return {
    issuanceModalData,
    issuanceModalOpen,
    setIssuanceModalOpen,
    viewOnLedger,
  };
}
