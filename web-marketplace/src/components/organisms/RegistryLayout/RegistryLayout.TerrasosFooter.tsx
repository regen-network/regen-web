'use client';
import React from 'react';
import { useLingui } from '@lingui/react';
import { useAtomValue } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import TerrasosFooter from '../TerrasosFooter';
import {
  getTerrasosFooterColumns,
  terrasosFooterSocialItems,
} from '../TerrasosFooter/TerrasosFooter.constants';
import {
  TERRAOS_COPYRIGHT,
  TERRAOS_POWERED_BY,
  TERRASOS_COMPANY_DESCRIPTION,
  TERRASOS_LOGO_ALT,
} from './RegistryLayout.constants';

const RegistryLayoutTerrasosFooter: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const { _ } = useLingui();
    const selectedLanguage = useAtomValue(selectedLanguageAtom);
    const TerrasosColumnItems = getTerrasosFooterColumns({
      _,
      selectedLanguage,
    });

    return (
      <TerrasosFooter
        copyright={_(TERRAOS_COPYRIGHT)}
        poweredBy={_(TERRAOS_POWERED_BY)}
        socialItems={terrasosFooterSocialItems}
        columnItems={TerrasosColumnItems}
        companyDescription={_(TERRASOS_COMPANY_DESCRIPTION)}
        logoAlt={_(TERRASOS_LOGO_ALT)}
      />
    );
  };

export { RegistryLayoutTerrasosFooter };
