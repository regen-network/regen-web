import { useState } from 'react';

import { IssuanceModalData } from 'web-components/lib/components/modal/IssuanceModal';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { buildIssuanceModalData } from 'lib/transform';

export default function useIssuanceModal(
  project?: Maybe<ProjectFieldsFragment>,
) {
  const [issuanceModalData, setIssuanceModalData] =
    useState<IssuanceModalData | null>(null);
  const [issuanceModalOpen, setIssuanceModalOpen] = useState(false);

  const viewOnLedger = (creditVintage: any): void => {
    if (creditVintage?.txHash) {
      if (creditVintage.txHash !== issuanceModalData?.txHash) {
        const issuanceData = buildIssuanceModalData(project, creditVintage);
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
