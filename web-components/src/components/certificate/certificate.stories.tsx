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
    buyerName="John Doe"
    date={new Date()}
    issuer={{ companyName: 'Regen Network', personName: 'Christian Shearer', personRole: 'CEO' }}
    projectDeveloper={{
      companyName: 'Impact Ag Partners',
      personName: 'Toby Grogan',
      personRole: 'Natural Capital Specialist',
    }}
    verifier={{ companyName: 'RSM Australia Pty Ltd', personName: 'Tim Pittaway', personRole: 'Partner' }}
  />
);
