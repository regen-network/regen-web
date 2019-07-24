import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Table from 'web-components/lib/components/table';
import { HeadRow } from 'web-components/lib/components/table/TableHead';
import { withKnobs, number } from '@storybook/addon-knobs';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): Data {
  return { name, calories, fat, carbs, protein };
}

const generateRows = (rows: number): ReadonlyArray<Data> => {
  const foodRows: Data[] = [];

  for (let i = 0; i < rows; i++) {
    const name = Math.random()
      .toString(36)
      .substring(7);
    const calories = getRandomArbitrary(50, 1200);
    const fat = (Math.random() * 150).toFixed(1);
    const carbs = getRandomArbitrary(4, 100);
    const protein = (Math.random() * 450).toFixed(1);

    const food = createData(name, calories, Number(fat), carbs, Number(protein));
    foodRows.push(food);
  }

  return foodRows;
};

const headRows: ReadonlyArray<HeadRow<Data>> = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const rows = generateRows(20);

storiesOf('Components|Tables/ Regen Tables', module)
  .addDecorator(withKnobs)
  .add('Sort and Pagination table', () =>
    React.createElement(() => (
      <Table
        initialOrderBy="calories"
        rows={rows}
        headRows={headRows}
        rowsPage={number('Rows per page', 10)}
      />
    )),
  )
  .add('5000 rows displaying 1000 rows per page', () => {
    const rows = generateRows(5000);

    return React.createElement(() => (
      <Table
        initialOrderBy="calories"
        rows={rows}
        headRows={headRows}
        rowsPage={number('Rows per page', 1000)}
      />
    ));
  });
