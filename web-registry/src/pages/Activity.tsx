import React from 'react';
import Section from 'web-components/lib/components/section';

import { CreditActivityTable, CreditTotals } from '../components/organisms';

const Activity: React.FC = () => {
  return (
    <Section title="Activity" titleAlign="left">
      <CreditTotals />
      <CreditActivityTable />
    </Section>
  );
};

export { Activity };
