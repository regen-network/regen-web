import React from 'react-router';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { Documentation } from '../../organisms';

interface InputProps {
  docs: any;
  txClient: ServiceClientImpl | undefined;
  viewOnLedger: any;
}

export function ProjectDocumentation({
  docs,
  txClient,
  viewOnLedger,
}: InputProps): JSX.Element {
  const { isKeplrMobileWeb } = useWallet();
  return (
    <>
      <div
        className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      >
        <Documentation
          txClient={txClient}
          onViewOnLedger={viewOnLedger}
          documents={docs.map((doc: any) => ({
            name: doc?.name || '',
            type: doc?.type || '',
            date: doc?.date || '',
            url: doc?.url || '',
            ledger: '',
            eventByEventId: doc?.eventByEventId,
          }))}
        />
      </div>
    </>
  );
}
