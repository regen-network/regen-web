import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import EnhancedTable from './index';

storiesOf('Components|Tables/mui-tables', module)
  .addDecorator(withKnobs)
  .add('default', () =>
    React.createElement(() => (
      <EnhancedTable
        rowsPage={number('Rows per page', 200)}
        totalRows={number('Total rows of the table', 1000)}
      />
    )),
  );
