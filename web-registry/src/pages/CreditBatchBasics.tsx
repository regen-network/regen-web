import React from 'react';

import { CreditBatchFormTemplate } from '../components/templates';
import { BatchBasicsForm } from '../components/organisms';

const CreditBatchBasics: React.FC = () => {
  return (
    <CreditBatchFormTemplate title="Create Credit Batch" activeStep={0}>
      <BatchBasicsForm submit={() => Promise.resolve()} />
    </CreditBatchFormTemplate>
  );
};

export { CreditBatchBasics };
