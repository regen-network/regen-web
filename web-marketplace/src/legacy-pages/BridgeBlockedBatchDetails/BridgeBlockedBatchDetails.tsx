import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { isBridgeClassIdPrefix } from 'lib/bridge';

import { BatchDetails } from '../BatchDetails/BatchDetails';

const BridgeBlockedBatchDetails = (): JSX.Element => {
  const { batchDenom } = useParams<{ batchDenom?: string }>();
  if (isBridgeClassIdPrefix(batchDenom)) {
    return <NotFoundPage />;
  }

  return <BatchDetails />;
};

export { BridgeBlockedBatchDetails };
