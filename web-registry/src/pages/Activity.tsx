import React from 'react';

import { EcocreditsSection } from '../components/molecules';
import { CreditActivityTable, CreditTotals } from '../components/organisms';

const Activity: React.FC = () => {
  return (
    <EcocreditsSection title="Activity">
      <CreditTotals />
      <CreditActivityTable />
    </EcocreditsSection>
  );
};

export { Activity };
