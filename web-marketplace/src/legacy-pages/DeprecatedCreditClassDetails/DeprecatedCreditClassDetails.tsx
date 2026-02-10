import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'legacy-pages/NotFound/NotFound';

import { BRIDGE_CLASS_ID } from 'lib/env';

import { CreditClassDetails } from '../CreditClassDetails/CreditClassDetails';

const DeprecatedCreditClassDetails = (): JSX.Element => {
  const { creditClassId } = useParams<{ creditClassId?: string }>();
  if (!BRIDGE_CLASS_ID || creditClassId !== BRIDGE_CLASS_ID) {
    return <NotFoundPage />;
  }

  return <CreditClassDetails />;
};

export { DeprecatedCreditClassDetails };
