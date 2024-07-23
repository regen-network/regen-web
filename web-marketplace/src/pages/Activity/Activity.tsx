import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { EcocreditsSection } from '../../components/molecules';
import { CreditActivityTable, CreditTotals } from '../../components/organisms';

const Activity: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();

  return (
    <EcocreditsSection title={_(msg`Activity`)}>
      <CreditTotals />
      <CreditActivityTable />
    </EcocreditsSection>
  );
};

export { Activity };
