import { LabelDisplayedRowsArgs } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import { TableActionButtons } from '../buttons/TableActionButtons';
import { ActionsTable } from './ActionsTable';

export default {
  title: 'ActionsTable',
  component: ActionsTable,
} as Meta<typeof ActionsTable>;

type Story = StoryObj<typeof ActionsTable>;

const isIgnoreOffset = false;
const rows = [
  ['Row 11', 'Row 12', 'Row 13'],
  ['Row 21', 'Row 22', 'Row 23'],
];

export const Default: Story = {
  render: args => <ActionsTable {...args} />,
};

Default.args = {
  tableLabel: 'actions table',
  actionButtonsText: 'Actions',
  isIgnoreOffset,
  labelDisplayedRows: ({ from, to, count }: LabelDisplayedRowsArgs) => {
    const displayedTo = isIgnoreOffset ? from + rows.length - 1 : to;
    return count !== -1
      ? `${from}–${displayedTo} of ${count}`
      : `${from}–${displayedTo} of more than ${to}`;
  },
  renderActionButtons: i => (
    <TableActionButtons
      buttons={[
        {
          label: `Do something with row ${i + 1}`,
          onClick: () => alert(`Action clicked for row ${i + 1}`),
        },
      ]}
    />
  ),
  headerRows: ['Column 1', 'Column 2', 'Column 3'],
  rows: rows,
};
