import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { isBridgeClassIdExact } from 'lib/bridge';

import { CreditClassDetails } from '../CreditClassDetails/CreditClassDetails';

const DeprecatedCreditClassDetails = (): JSX.Element => {
  const { creditClassId } = useParams<{ creditClassId?: string }>();
  if (!isBridgeClassIdExact(creditClassId)) {
    return <NotFoundPage />;
  }

  return <CreditClassDetails />;
};

export { DeprecatedCreditClassDetails };
