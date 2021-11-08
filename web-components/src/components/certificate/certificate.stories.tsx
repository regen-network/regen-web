import React from 'react';
import Certificate from 'web-components/lib/components/certificate';

export default {
  title: 'Certificate',
  component: Certificate,
};

export const certificate = (): JSX.Element => (
  <Certificate
    background="./certificate-bg.png"
    creditName="Carbon<i>Plus</i> Grasslands"
    creditsUnits={1000}
    equivalentTonsCO2={1000}
    buyerName="Marie Gauthier"
    date={'10-10-2020'}
    stakeholders={[
      { companyName: 'Regen Network', personName: 'Christian Shearer', personRole: 'CEO', label: 'issuer' },
      {
        companyName: 'John Doe Ltd',
        personName: 'John Doe',
        personRole: 'Director',
        label: 'issuee',
      },
    ]}
  />
);
