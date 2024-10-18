import React from 'react';
import { useLingui } from '@lingui/react';

import TerrasosFooter from '../TerrasosFooter';
import { terrasosFooterSocialItems } from '../TerrasosFooter/TerrasosFooter.constants';
import {
  TERRAOS_COPYRIGHT,
  TERRAOS_POWERED_BY,
} from './RegistryLayout.constants';

const RegistryLayoutTerrasosFooter: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { _ } = useLingui();

    return (
      <TerrasosFooter
        copyright={_(TERRAOS_COPYRIGHT)}
        poweredBy={_(TERRAOS_POWERED_BY)}
        socialItems={terrasosFooterSocialItems}
      />
    );
  };

export { RegistryLayoutTerrasosFooter };
