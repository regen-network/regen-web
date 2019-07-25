import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RegenTableHead, { HeadRow } from './TableHead';
import RegenTableCell from './TableCell';
import TablePageFiller from './TablePageFiller';
import { Order, stableSort, getSorting } from './sorting';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

interface Props<TableType> {
  readonly rowsPage: number;
  readonly initialOrderBy: keyof TableType;
  readonly rows: ReadonlyArray<TableType>;
  readonly headRows: ReadonlyArray<HeadRow<TableType>>;
}

export interface TableType {
  name: string;
  [key: string]: string | number;
}

export default function RegenTable<T extends TableType>({
  initialOrderBy,
  headRows,
  rowsPage,
  rows,
}: Props<T>): JSX.Element {
  const classes = useStyles({});
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>(initialOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(() => rowsPage);

  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof T): void {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function onRowClick(name: string): () => void {
    return () => {
      console.log('Clicked on... ' + name); // eslint-disable-line
    };
  }

  function handleChangePage(event: unknown, newPage: number): void {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const rowsToFillPage = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
            <RegenTableHead
              headRows={headRows}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (row: T, index: number): JSX.Element => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    const cells = Object.keys(row).map((key: string, index: number) => (
                      <RegenTableCell isFirst={index === 0} value={row[key]} labelId={labelId} />
                    ));

                    return (
                      <TableRow hover onClick={onRowClick(`${row.name}`)} tabIndex={-1} key={row.name}>
                        {cells}
                      </TableRow>
                    );
                  },
                )}
              <TablePageFiller emptyRows={rowsToFillPage} />
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, rowsPage > 25 ? rowsPage : 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
