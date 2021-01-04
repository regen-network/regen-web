import React from 'react';
import Certificate from 'web-components/lib/components/certificate';

export default {
  title: 'Components|Certificate',
  component: Certificate,
};

export const certificate = (): JSX.Element => (
  <Certificate
    background="./certificate-bg.png"
    creditName="Carbon<i>Plus</i> Grasslands"
    creditsUnits={1000}
    equivalentTonsCO2={1000}
    buyerName="Marie Gauthier"
    date={'2020-10-10'}
    issuer={{ companyName: 'Regen Network', personName: 'Christian Shearer', personRole: 'CEO' }}
    issuee={{
      companyName: 'John Doe Ltd',
      personName: 'John Doe',
      personRole: 'Director',
    }}
    verifier={{ companyName: 'RSM Australia Pty Ltd', personName: 'Tim Pittaway', personRole: 'Partner' }}
  />
);
