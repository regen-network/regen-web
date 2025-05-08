import { Trans } from '@lingui/macro';

import { BridgedTxStatus } from 'types/ledger/ecocredit';

import { Link } from 'components/atoms';

import {
  BRIDGED_STATUSES,
  STATUS_COMPLETE,
  STATUS_ERROR,
  STATUS_PENDING,
} from './BridgedEcocreditsTable.constants';

export const Note: React.FC<
  React.PropsWithChildren<{ status: BridgedTxStatus; txHash?: string }>
> = ({ status, txHash }) => {
  switch (BRIDGED_STATUSES[status]) {
    case STATUS_COMPLETE:
      return process.env.NEXT_PUBLIC_TOUCAN_LINK ? (
        // eslint-disable-next-line lingui/no-unlocalized-strings
        <Link href={process.env.NEXT_PUBLIC_TOUCAN_LINK}>{'toucan.earth'}</Link>
      ) : null;
    case STATUS_ERROR:
      return (
        <Trans>
          {'Please contact us at '}
          <Link href="support@regen.network">support@regen.network</Link>
          {' to resolve this issue. Do not reinitiate the transaction.'}
        </Trans>
      );
    case STATUS_PENDING:
      return (
        <Trans>
          {'Usually takes <30 minutes to process. Please contact us at '}
          <Link href="support@regen.network">support@regen.network</Link>
          {' if more time has passed.'}
        </Trans>
      );
    default:
      return null;
  }
};
