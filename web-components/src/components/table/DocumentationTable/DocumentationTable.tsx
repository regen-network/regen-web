import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import { getFormattedDate } from '../../../utils/format';
import ContainedButton from '../../buttons/ContainedButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import DocumentIcon from '../../icons/DocumentIcon';
import EyeIcon from '../../icons/EyeIcon';
import ShieldIcon from '../../icons/ShieldIcon';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledTableSortLabel,
} from '..';
import { getComparator, Order, stableSort } from '../Table.utils';
import { useDocumentationTableStyles } from './DocumentationTable.styles';

interface DocumentRowData {
  name: string;
  type: string;
  date: string | Date;
  url: string;
  ledger: string;
}

interface Document extends DocumentRowData {
  eventByEventId?: any;
}

export interface DocumentationTableProps {
  className?: string;
  rows: Document[];
  canClickRow?: boolean;
  onViewOnLedger?: (ledgerData: any) => void;
  txClient?: ServiceClientImpl;
  headCells: HeadCell[];
  viewLedgerText: string;
  viewDocumentText: string;
  tableAriaLabel: string;
}

export interface HeadCell {
  id: keyof DocumentRowData;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  headCells: HeadCell[];
  classes: Record<string, string>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DocumentRowData,
  ) => void;
  order: Order;
  orderBy: string;
  hasViewOnLedgerColumn?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
  const { order, orderBy, onRequestSort, hasViewOnLedgerColumn, headCells } =
    props;
  const headCellsCopy = [...headCells];
  const createSortHandler =
    (property: keyof DocumentRowData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const ledgerColumnCell: HeadCell = { id: 'ledger', numeric: true, label: '' };
  if (hasViewOnLedgerColumn) headCellsCopy.splice(3, 0, ledgerColumnCell); // don't show this headerCell if no ledger data

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

const DocumentationTable: React.FC<
  React.PropsWithChildren<DocumentationTableProps>
> = ({
  rows,
  canClickRow = false,
  onViewOnLedger,
  txClient,
  className,
  headCells,
  viewLedgerText,
  viewDocumentText,
  tableAriaLabel,
}) => {
  const { classes: styles, cx } = useDocumentationTableStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DocumentRowData>('name');

  function handleClickNavigate(url: string): void {
    if (canClickRow) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DocumentRowData,
  ): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  let hasViewOnLedgerColumn: boolean = false;
  for (const r of rows) {
    if (
      r.eventByEventId?.creditVintageByEventId?.txHash &&
      txClient &&
      onViewOnLedger
    ) {
      hasViewOnLedgerColumn = true;
    }
  }

  return (
    <StyledTableContainer className={className}>
      <Table aria-label={tableAriaLabel} stickyHeader>
        <EnhancedTableHead
          classes={styles}
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          hasViewOnLedgerColumn={hasViewOnLedgerColumn}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
            const hasViewOnLedger =
              row.eventByEventId?.creditVintageByEventId?.txHash &&
              txClient &&
              onViewOnLedger;
            return (
              <StyledTableRow
                tabIndex={-1}
                key={row.name}
                className={cx(canClickRow && styles.rowClickable)}
                onClick={() => handleClickNavigate(row.url)}
              >
                <StyledTableCell
                  className={styles.nameCell}
                  id={labelId}
                  scope="row"
                >
                  <div className={styles.name}>
                    <DocumentIcon
                      className={styles.icon}
                      fileType={row?.name?.split('.')?.pop()}
                    />{' '}
                    {row.name}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="left">
                  {typeof row.date === 'string' &&
                    getFormattedDate(
                      row.date,
                      options as Intl.DateTimeFormatOptions,
                    )}
                </StyledTableCell>
                {hasViewOnLedger && onViewOnLedger && (
                  <StyledTableCell
                    className={styles.documentCell}
                    align="right"
                  >
                    <ContainedButton
                      className={cx(styles.button, styles.ledgerBtn)}
                      onClick={() =>
                        onViewOnLedger(
                          row.eventByEventId.creditVintageByEventId,
                        )
                      }
                      startIcon={<ShieldIcon />}
                    >
                      {viewLedgerText}
                    </ContainedButton>
                  </StyledTableCell>
                )}
                {hasViewOnLedgerColumn && !hasViewOnLedger && (
                  <StyledTableCell
                    className={styles.documentCell}
                    align="right"
                  ></StyledTableCell>
                )}
                <StyledTableCell className={styles.documentCell} align="right">
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    <OutlinedButton
                      startIcon={<EyeIcon />}
                      className={styles.button}
                    >
                      {viewDocumentText}
                    </OutlinedButton>
                  </a>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export { DocumentationTable };
export type { Document, DocumentRowData };
