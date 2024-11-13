import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cx from 'classnames';

import { LESS, MORE, READ } from 'lib/constants/shared.constants';
import { NameImageDescription } from 'lib/db/types/json-ld';
import { useWallet } from 'lib/wallet/wallet';

import { LandManagementActions } from '../../organisms';

interface InputProps {
  actions: NameImageDescription[];
}

export function ManagementActions({ actions }: InputProps): JSX.Element {
  const { _ } = useLingui();
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
            text: _(READ),
            lessText: _(LESS),
            moreText: _(MORE),
          }))}
          title={_(msg`Land Management Actions`)}
          subtitle={_(
            msg`This is how the project developers are planning to achieve the primary impact.`,
          )}
        />
      </div>
    </>
  );
}
