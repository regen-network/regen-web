import React from 'react';

import { Body } from '../../typography';

const SignerName = ({ name }: { name: string }): JSX.Element => {
  return (
    <Body size="sm" sx={{ ml: 2, fontWeight: 800 }}>
      {name}
    </Body>
  );
};

export default SignerName;
