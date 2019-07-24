import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RegenTableHead, { Order, HeadRow } from './TableHead';
import TablePageFiller from './TablePageFiller';

function desc<T>(a: T, b: T, orderBy: keyof T): any {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: ReadonlyArray<T>, cmp: (a: T, b: T) => number): any {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

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

interface Props<T> {
  readonly rowsPage: number;
  readonly initialOrderBy: keyof T;
  readonly rows: ReadonlyArray<T>;
  readonly headRows: ReadonlyArray<HeadRow<T>>;
}

export default function EnhancedTable<T extends { name: string }>({
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

  function handleClick(_event: React.MouseEvent<unknown>, name: string): void {
    console.log('Clicked on... ' + name); // eslint-disable-line
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

                    const rowComponent = Object.keys(row).map((key: string, index: number) => {
                      const isFirst = index === 0;
                      const value = row[key as keyof T];
                      return isFirst ? (
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {value}
                        </TableCell>
                      ) : (
                        <TableCell>{value}</TableCell>
                      );
                    });

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, `${row.name}`)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        {rowComponent}
                      </TableRow>
                    );
                  },
                )}
              <TablePageFiller emptyRows={rowsToFillPage} />
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, rowsPage]}
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
