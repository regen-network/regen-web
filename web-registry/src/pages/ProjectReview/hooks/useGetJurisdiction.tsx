import { useEffect, useState } from 'react';

import { AnchoredProjectMetadataBaseLD } from 'lib/db/types/json-ld';

import { getJurisdiction } from '../ProjectReview.util';

type Props = {
  metadata: Partial<AnchoredProjectMetadataBaseLD>;
};

export const useGetJurisdiction = ({ metadata }: Props): string | undefined => {
  const [jurisdiction, setJurisdiction] = useState<string | undefined>();

  useEffect(() => {
    const getIsoCode = async (): Promise<void> => {
      const isoCode = await getJurisdiction(metadata);
      if (isoCode) {
        setJurisdiction(isoCode);
      }
    };

    getIsoCode();
  }, [metadata]);

  return jurisdiction;
};
