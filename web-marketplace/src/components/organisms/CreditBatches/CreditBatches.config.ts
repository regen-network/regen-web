import { msg } from '@lingui/macro';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { TranslatorType } from 'lib/i18n/i18n.types';

export interface CreditBatchesHeadCell {
  id: keyof BatchInfoWithSupply;
  label: string;
  numeric: boolean;
  wrap?: boolean;
  tooltip?: string; // the content for the info tooltip
}

export const getCreditBatchesHeadCells = (
  _: TranslatorType,
): CreditBatchesHeadCell[] => [
  { id: 'txhash', numeric: false, label: _(msg`tx hash`) },
  { id: 'projectName', numeric: false, label: _(msg`project`) },
  { id: 'classId', numeric: false, label: _(msg`credit class`) },
  { id: 'denom', numeric: false, label: _(msg`batch denom`) },
  { id: 'issuer', numeric: false, label: _(msg`issuer`) },
  {
    id: 'tradableAmount',
    numeric: true,
    label: _(msg`total amount tradable`),
    wrap: true,
  },
  {
    id: 'retiredAmount',
    numeric: true,
    label: _(msg`total amount retired`),
    wrap: true,
  },
  {
    id: 'cancelledAmount',
    numeric: true,
    label: _(msg`total amount cancelled`),
    wrap: true,
    tooltip: _(
      msg`Cancelled credits have been removed from from the credit batch's tradable supply. Cancelling credits is permanent and implies the credits have been moved to another chain or registry.`,
    ),
  },
  { id: 'startDate', numeric: true, label: _(msg`start date`) },
  { id: 'endDate', numeric: true, label: _(msg`end date`) },
  { id: 'projectLocation', numeric: false, label: _(msg`project location`) },
];
