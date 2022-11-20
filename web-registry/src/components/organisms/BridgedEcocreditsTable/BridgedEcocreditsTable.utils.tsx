import { BridgedTxStatus } from 'types/ledger/ecocredit';

import { Link } from 'components/atoms';

import {
  BRIDGED_STATUSES,
  STATUS_COMPLETE,
  STATUS_ERROR,
  STATUS_PENDING,
} from './BridgedEcocreditsTable.constants';

export const getNote = (
  status: BridgedTxStatus,
  txHash?: string,
): JSX.Element | null => {
  switch (BRIDGED_STATUSES[status]) {
    case STATUS_COMPLETE:
      return (
        <Link
          href={`${process.env.REACT_APP_TOUCAN_LINK}${
            process.env.CONTEXT === 'production' ? '' : `/${txHash}`
          }`}
        >
          toucan.earth
        </Link>
      );
    case STATUS_ERROR:
      return (
        <>
          Please contact us at{' '}
          <Link href="support@regen.network">support@regen.network</Link> to
          resolve this issue. Do not reinitiate the transaction.
        </>
      );
    case STATUS_PENDING:
    default:
      return null;
  }
};
