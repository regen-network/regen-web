import { BatchInfoWithSupply } from 'types/ledger/ecocredit';

export interface CreditBatchesHeadCell {
  id: keyof BatchInfoWithSupply;
  label: string;
  numeric: boolean;
  wrap?: boolean;
  tooltip?: string; // the content for the info tooltip
}

export const creditBatchesHeadCells: CreditBatchesHeadCell[] = [
  { id: 'txhash', numeric: false, label: 'tx hash' },
  { id: 'projectName', numeric: false, label: 'project' },
  { id: 'classId', numeric: false, label: 'credit class' },
  { id: 'denom', numeric: false, label: 'batch denom' },
  { id: 'issuer', numeric: false, label: 'issuer' },
  {
    id: 'tradableAmount',
    numeric: true,
    label: 'total amount tradable',
    wrap: true,
  },
  {
    id: 'retiredAmount',
    numeric: true,
    label: 'total amount retired',
    wrap: true,
  },
  {
    id: 'cancelledAmount',
    numeric: true,
    label: 'total amount cancelled',
    wrap: true,
    tooltip:
      "Cancelled credits have been removed from from the credit batch's tradable supply. Cancelling credits is permanent and implies the credits have been moved to another chain or registry.",
  },
  { id: 'startDate', numeric: true, label: 'start date' },
  { id: 'endDate', numeric: true, label: 'end date' },
  { id: 'projectLocation', numeric: false, label: 'project location' },
];
