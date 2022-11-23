import { useEffect, useState } from 'react';

import { ProjectMetadataIntersectionLD } from 'generated/json-ld';

import { getJurisdiction } from '../ProjectReview.util';

type Props = {
  metadata: Partial<ProjectMetadataIntersectionLD>;
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
