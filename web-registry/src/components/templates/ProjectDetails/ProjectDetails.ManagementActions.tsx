import React from 'react';
import cx from 'classnames';

import { NameImageDescription } from 'lib/db/types/json-ld';
import { useWallet } from 'lib/wallet/wallet';

import { LandManagementActions } from '../../organisms';

interface InputProps {
  actions: NameImageDescription[];
}

export function ManagementActions({ actions }: InputProps): JSX.Element {
  const { isKeplrMobileWeb } = useWallet();
  return (
    <>
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <LandManagementActions
          actions={actions.map((action: any) => ({
            name: action['schema:name'],
            description: action['schema:description'],
            imgSrc: action['schema:image'],
          }))}
          title="Land Management Actions"
          subtitle="This is how the project developers are planning to achieve the primary impact."
        />
      </div>
    </>
  );
}
