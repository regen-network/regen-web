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
      try {
        const isoCode = await getJurisdiction(metadata);
        if (isoCode) {
          setJurisdiction(isoCode);
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    };

    getIsoCode();
  }, [metadata]);

  return jurisdiction;
};
