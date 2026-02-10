import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { BRIDGE_CLASS_ID } from 'lib/env';

import { BatchDetails } from '../BatchDetails/BatchDetails';

const DeprecatedBatchDetails = (): JSX.Element => {
  const { batchDenom } = useParams<{ batchDenom?: string }>();
  if (!BRIDGE_CLASS_ID || !batchDenom?.startsWith(BRIDGE_CLASS_ID)) {
    return <NotFoundPage />;
  }

  return <BatchDetails />;
};

export { DeprecatedBatchDetails };
